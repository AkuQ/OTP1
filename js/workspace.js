
const mode_keys = [16,17,18,27,225];
const lock_keys = [20, 144];
const function_keys = range(112, 123);
const non_input_keys = toSet(mode_keys, lock_keys, function_keys);


/**
 * @typedef {Object} UpdateIn
 * @property {int} update_id
 * @property {string} mode
 * @property {int} pos
 * @property {int} len
 * @property {string} input
 */

/**
 * @typedef {Object} UpdateOut
 * @property {int} pos
 * @property {int} last_update_id
 * @property {string} insert
 * @property {int} remove
 */

/**
 * @callback GetWorkspaceContent
 * @param {Object} result
 * @param {string} result.content
 * @param {int} result.last_update
 */

/**
 * @callback EditWorkspace
 * @param {UpdateOut} input
 */

/**
 * @callback GetWorkspaceUpdates
 * @param {Object} result
 * @param {int} result.caret_pos
 * @param {UpdateIn[]} result.updates
 */


/**
 *
 * @param {Element} textarea
 * @param {int} user_id
 * @param {GetWorkspaceContent} get_content_cb
 * @param {EditWorkspace} edit_cb
 * @param {GetWorkspaceUpdates} get_updates_cb
 * @constructor
 */
var Workspace = function (textarea, user_id, get_content_cb, edit_cb, get_updates_cb) {
    var replace_mode = 0; //0 == false, 1 == true, 2 == primed for false (for catching input before deselect)
    var replace_range = {start:0, end:0};
    var prev_content = "";

    init();

    //INITIALIZATION:

    function init() {
        // textarea.readOnly = true;
        textarea.value = "";
        bindEvents();
        get_content_cb(function (result) {
            textarea.value = prev_content = result.content;
            last_update_id = result.last_update_id;
            textarea.readOnly = false;
        });
    }

    function bindEvents() {

        textarea.onselect = function (evt) {
            replace_range['start'] = evt.target.selectionStart;
            replace_range['end'] = evt.target.selectionEnd;
            replace_mode = 1;
            console.log("Select " + evt.target.selectionStart + " <-> " + evt.target.selectionEnd);
        };

        textarea.addEventListener("input", function (evt) {
            var caret_pos;

            if (evt.inputType === "insertText") {
                caret_pos = evt.target.selectionStart - 1;
                removeCurrentRange();
                insert(evt.data, caret_pos);
                console.log("Insert " + evt.data + " at " + caret_pos);
            }
            else if (evt.inputType === "insertFromPaste") {
                var remove_len = removeCurrentRange();
                var insert_len = evt.target.value.length - prev_content.length + remove_len;
                caret_pos = evt.target.selectionStart - insert_len;
                var data = evt.target.value.substr(caret_pos, insert_len);
                insert(data, caret_pos);
                console.log("Paste " + data + " at " + caret_pos);
            }
            else if (evt.inputType === "deleteContentBackward") {
                removeCurrentRange();
                caret_pos = evt.target.selectionStart + 1;
                backspace(caret_pos);
            }
            else if (evt.inputType === "historyUndo" || evt.inputType === "historyRedo") {
                revertInput();  // disable undo/redo for now //todo better solution
            }
            deselectTrigger();
            prev_content = evt.target.value;
        });


        //DESELECT EVENTS:

        textarea.addEventListener("blur", function (evt) {
            deselect();
        });
        textarea.addEventListener("focus", function (evt) {
            deselect();
        });
        textarea.addEventListener("keydown", function (evt) {  // Must be handled after above "input" event
            var k = evt.keyCode;
            if (!(k in non_input_keys)) {
                deselectPrime();
            }
        });
        textarea.addEventListener("keyup", function (evt) {
            var k = evt.keyCode;
            if (!(k in non_input_keys)) {
                deselectTrigger();
            }
        });
        textarea.addEventListener("mousedown", function (evt) {
            deselect();
        });
    }


    //INPUT HANDLERS & READERS:

    function deselectPrime(){
        if (replace_mode === 1) {
            replace_mode = 2;
        }
    }

    function deselectTrigger(){
        if (replace_mode === 2) {
            replace_mode = 0;
            console.log("Deselected");
        }
    }

    function deselect() {
        if (replace_mode !== 0) {
            replace_mode = 0;
            console.log("Deselected");
        }
    }

    function backspace(pos) {
        if (!replace_mode) {
            bufferRemoval(pos, 1);
            console.log("Backspace at " + pos);
        }
    }

    function removeCurrentRange() {
        var len = 0;
        if(replace_mode) {
            var pos = replace_range['end'];
            len = replace_range['end'] - replace_range['start'];
            bufferRemoval(pos, len);
            console.log("Removed " + len + " left of " + pos);
        }
        return len;
    }

    function insert(pos, content) {
        bufferInsert(pos, content);
    }

    function revertInput() {
        textarea.value = prev_content;
    }


    //SYNCHRONIZATION:

    var sync_content = "";
    var last_update_id = -1;
    var server_has_updates = true;
    var is_polling_updates = false;

    var pending_updates_in = [];
    var pending_updates_out = [];
    var count_my_updates_currently_processed_by_server = 0;

    function bufferRemoval(pos, len){
        pos = getCaretPosForSyncedContent(pos);
        var update = {
            pos: pos,
            remove: len,
            since: last_update_id
        };
        pending_updates_out.push(update);
        edit_cb(update);
    }

    function bufferInsert(pos, content){
        pos = getCaretPosForSyncedContent(pos);
        var update = {
            pos: pos,
            insert: content,
            since: last_update_id
        };
        pending_updates_out.push(update);
        edit_cb(update);
    }

    this.lazyUpdate = function () {
        server_has_updates = true;
    };


    function syncContent() {
        getWorkspaceUpdates(pending_updates_out, last_update_id, function (updates, caret_pos) {
            is_polling_updates = true;
            textarea.readOnly = true;
            var count_my_updates_processed = countMyUpdates(updates);
            if (count_my_updates_currently_processed_by_server - count_my_updates_processed === 0) {

            }
            textarea.readOnly = false;
            is_polling_updates = false;
        });
    }


};

//GENERIC HELPERS:

function range(start, end) {
    return Array.apply(null, {length: (1 + end - start)}).map(Function.call, function () {
        return start++;
    });
}

function toSet() {
    var arr = [];
    Array.prototype.slice.call(arguments).forEach(function (arg_arr) {
        arr = arr.concat(arg_arr);
    });
    return Object.assign(...arr.map(v => ({ [v]: 0 })));
}
