
const root = "http://localhost:8080/";

const url = {
    urlLogin: root + "login",
    urlRegiter: root + "register",
    urlTest: root + "getInfo",
    urlBoardDelete: root + "board/delete",
    urlGetAllBoard: root + "board/get-all",
    urlGetAllWorkList: root + "work-list/get-all",
    urlCreateBoard: root + "board/create",
    urlCreateWorkList: root + "work-list/create",
    urlCreateTask: root + "task/create",
    updateDisplayOrderWorkList: root + "work-list/update-display-order",
    urlRenameWorkList: root + "work-list/rename",
    urlupdateDisplayOrderTask: root + "task/update-display-order",
    urlDeleteWorkList: root + "work-list/delete",
    urlGetAllComment: root + "comment/get-all",
}
export default url;
