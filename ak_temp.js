
const mode_keys = [16,17,18,27,225];
const lock_keys = [20, 144];
const function_keys = range(112, 123);
const non_input_keys = toSet(mode_keys, lock_keys, function_keys);


/**
 *
 * @param {Element} textarea
 * @constructor
 */
var WorkspaceHandler = function (textarea) {
    var replace_mode = 0; //0 == false, 1 == true, 2 == primed for false (for catching input before deselect)
    var replace_range = {start:0, end:0};
    var prev_content = "";

    var sync_content = "";
    var pending_updates_in = [];
    var pending_updates_out = [];
    var count_my_updates_currently_processed_by_server = 0;

    // textarea.readOnly = true;
    textarea.value = "";
    bindEvents();
    // syncContent();
    textarea.readOnly = false;


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
            socketWorkspaceRemove(pos, 1);
            console.log("Backspace at " + pos);
        }
    }

    function removeCurrentRange() {
        var len = 0;
        if(replace_mode) {
            var pos = replace_range['end'];
            len = replace_range['end'] - replace_range['start'];
            socketWorkspaceRemove(pos, len);
            console.log("Removed " + len + " left of " + pos);
        }
        return len;
    }

    function insert(pos, content) {
        socketWorkspaceInsert(pos, content);
    }

    function revertInput() {
        textarea.value = prev_content;
    }

    //SYNCHRONIZATION:


};

//SOCKET CALLS:

function socketWorkspaceRemove(pos, len) {
    var params = {
        pos: pos,
        remove: len,
        //since: getCurrentWorkspaceUpdateID()}; //todo
    }
    //socketEmit("edit workspace", params); //todo
}

function socketWorkspaceInsert(pos, content) {
    var params = {
        pos: pos,
        insert: content,
        //since: getCurrentWorkspaceUpdateID()}; //todo
    }
    //socketEmit("edit workspace", params); //todo
}


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
