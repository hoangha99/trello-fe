import React, { useEffect } from 'react';
import { useState } from 'react';
import './task.css';
import {
    PlusOutlined
    , HomeOutlined,
    MenuOutlined,
    MessageOutlined,
    SmileOutlined,
    UserAddOutlined,
    FieldTimeOutlined,
    PictureOutlined,
    DownOutlined // Quang
} from '@ant-design/icons';
import {
    Button,
    Modal,
    Avatar,
    Form,
    Checkbox,
    Dropdown,
    DatePicker
} from "antd"; // Quang
import moment from 'moment';
// import api from './callApi/baseUrl';
import { v4 as uuidv4 } from 'uuid'
import { storage } from '../../firebase/firebase-config';
import { deleteDeadlineApi, deleteUserToTaskApi, getAllUserInTask, getComments, getDeadlineByTaskIdApi, getUsersToAddToTask, postCommentApi, postDeadlineToTaskApi, postUserToTaskApi, updateDeadlineApi, updateImageTask } from '../../Api/func/user';

function Task(props) {

    // deadline
    const [startDate, setStartDate] = useState("01/01/2021");
    const [endDate, setEndDate] = useState("01/01/2021");
    const [done, setDone] = useState(false);
    const [colorDone, setColorDone] = useState("");
    const [openDeadline, setOpenDeadline] = useState(false);
    const [isModalDeadVisible, setIsModalDeadVisible] = useState(false);
    const [deadlineDetail, setdeadlineDetail] = useState({})
    const showModalDead = async () => {
        console.log(done);
        setIsModalDeadVisible(true);
    };
    const handleCancelDead = () => {
        setIsModalDeadVisible(false);
    };
    const handleSaveDeadline = async () => {
        console.log(props.obj.taskId);
        const dl = await getDeadlineByTaskIdApi({ taskId: props.obj.taskId });
        if (!dl.data) {
            await postDeadlineToTaskApi({
                taskId: props.obj.taskId,
                startDate: startDate,
                endDate: endDate,
                complete: false
            }).then(res => {
                console.log(res.data);
                setdeadlineDetail(res.data);
            }).catch(e => {
                console.log("Loi: " + e);
            });
        } else {
            await updateDeadlineApi({
                deadlineId: deadlineDetail.deadlineId,
                startDate: startDate,
                endDate: endDate,
                complete: !done
            }).then(res => {
                setdeadlineDetail(res.data)
            });
            setOpenDeadline(true);
        }

        setOpenDeadline(true);
        setIsModalDeadVisible(false);
    };
    const handleDeleteDeadline = async () => {
        await deleteDeadlineApi({
            deadlineId: deadlineDetail.deadlineId
        });
        setOpenDeadline(false);
    };
    function getDateValue(dates, dateStrings) {
        setStartDate(dateStrings[0]);
        setEndDate(dateStrings[1]);
    }
    const onChangeCheckColor = async () => {
        setDone(!done);
        {
            done ? setColorDone("#61bd4f") : setColorDone("#EBECF0");
        }
        await updateDeadlineApi({
            deadlineId: deadlineDetail.deadlineId,
            startDate: deadlineDetail.startDate,
            endDate: deadlineDetail.endDate,
            complete: !done
        });
    };
    const { RangePicker } = DatePicker;

    const dateFormat = 'DD/MM/YYYY';

    //state
    const [comments, setcomments] = useState([]);
    const [contentCmt, setcontentCmt] = useState("");
    const [userTask, setuserTask] = useState([]);
    const [userNoTask, setuserNoTask] = useState([]);
    const [image, setimage] = useState(props.obj.image);

    //onchange
    const commentOnChange = (e) => {
        if (e.target.value) {
            setcontentCmt(e.target.value);
        }
    }

    //get data
    //get all comment
    const getAllComment = async () => {
        const cmt = await getComments({
            taskId: props.obj.taskId
        });
        setcomments(cmt.data);
    }
    //L???y t???t c??? user ???????c giao vi???c trong task
    const getAllUserTask = async () => {
        const ut = await getAllUserInTask({ taskId: props.obj.taskId })
        setuserTask(ut.data);
    }
    //L???y t??t c??? user trong b???ng m?? ko thu???c task
    const getAllUserNoTask = async () => {
        const unt = await getUsersToAddToTask({ taskId: props.obj.taskId });
        // const unt = await api.get("user_no_task");
        setuserNoTask(unt.data);
    }

    //Chi ti???t ng?????i d??ng trong task
    const detailUserTask = async (obj) => {
        await deleteUserToTaskApi({
            userId: obj.id,
            taskId: props.obj.taskId
        }).then(async (res) => {
            const allUserTask = await getAllUserTask();
            if (allUserTask)
                setuserTask(allUserTask);
        });
    }

    /**
     * 3 ch???c n??ng trong task
     * Th??m Th??nh vi??n, Deadline, ???nh b??a
     */

    //Click nut them thanh vien
    const btnAddMemberOnClick = async () => {
        setIsModalVisible(true)
        getAllUserNoTask();
    }
    //Click v??o th??nh vi??n ????? th??m th??nh vi??n v??o t??ks
    const btnAddMemberTask = async (obj) => {
        const arr = userNoTask;
        console.log("arr: ", arr)
        for (let i = 0; i < arr.length; i++) {
            if (obj.id === arr[i].id) {
                arr.splice(i, 1);
            }
        }
        await postUserToTaskApi({
            userId: obj.id,
            taskId: props.obj.taskId
        });
        setuserTask([...userTask, obj])
        setuserNoTask([...arr]);
    }
    //???nh b??a - m???
    const chooseImage = () => {
        const dom = document.getElementById("modal-picture");
        dom.classList.toggle("isHide")
    }
    //???nh b??a - ????ng
    const btnCloseImageOnClick = () => {
        const dom = document.getElementById("modal-picture");
        dom.classList.add("isHide")
        // setimage("");
    }
    //???nh b??a - ch???n ???nh
    const imageOnChange = (e) => {
        if (e.target.files[0]) {
            setimage(e.target.files[0])
        }
    }
    //???nh b??a - t???i l??n ???nh
    const btnUploadImageOnClick = () => {
        console.log(image.name)
        if (image.name) {
            var imgSplit = image.name.split(".");
            var imgName = uuidv4() + "." + imgSplit[imgSplit.length - 1];
            // console.log(imgName);
            const uploadTask = storage.ref(`images/${imgName}`).put(image);
            uploadTask.on(
                "state_change",
                error => {
                    console.log(error);
                },
                () => {
                    storage.ref('images')
                        .child(imgName)
                        .getDownloadURL()
                        .then(async (url) => {
                            console.log(url);
                            await updateImageTask({
                                taskId: props.obj.taskId,
                                urlImage: url
                            }).then((res) => {
                                console.log("sau khi upload:", res)
                                setimage(res.data);
                            });

                        });
                }
            );
        } else alert("Chwa chon anh");
    }
    //post comment
    const postComment = async () => {
        const comment = {
            taskId: props.obj.taskId,
            content: contentCmt,
            fullName: props.user.fullName

        }
        // debugger;
        await postCommentApi({
            taskId: props.obj.taskId,
            content: contentCmt
        }).then(res => {
            setcomments([...comments, comment]);
            setcontentCmt("");
        });
    }
    //useeffect
    useEffect(async () => {
        const dl = await getDeadlineByTaskIdApi({ taskId: props.obj.taskId });
        if (!dl.data) {
        } else {
            console.log(dl.data)
            setdeadlineDetail(dl.data)
            setDone(dl.data.complete)
            setStartDate(dl.data.startDate);
            setEndDate(dl.data.endDate)
            setOpenDeadline(true);
        }
        getAllComment();
        getAllUserTask();
    }, [props.obj.taskId])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (

        <>
            <img src={(image) ? image : ""} className={(image === "" || image === null) ? "isHide" : ""} style={{ width: "100%", height: "400px", margin: "15px 0 10px 0" }} />
            <div className="modal-custom">
                <div className="card-left">
                    {/* T??n task */}
                    <div className="card-left__name flex mb-10" style={{ marginTop: "10px" }}>
                        <HomeOutlined className="common-icon width-10" />
                        {/* <div className="name-icon width-10">icon</div> */}
                        <div className="name-name">T??n th???</div>
                    </div>

                    {/* Th??nh vi??n, ng??y h???t h???n */}
                    <div className="card-left__memeber flex mb-10" style={{ fontSize: "14px" }}>
                        <div className="width-10" />
                        <div className="memeber-memeber" >
                            <div>TH??NH VI??N</div>
                            <div>
                                {/* Duyet tat ca thanh vien */}
                                {
                                    userTask.map((obj, index) => (
                                        <button key={index} onClick={() => detailUserTask(obj)} className="member-task">
                                            <Avatar
                                                style={{
                                                    color: '#fff',
                                                    backgroundColor: '#84ABF7',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                }}
                                            >{(obj.fullName) ? obj.fullName.charAt(0).toUpperCase() : ""}
                                            </Avatar>
                                        </button>
                                    ))
                                }
                                <button onClick={btnAddMemberOnClick} className="member-task">
                                    <Avatar
                                        style={{
                                            color: '#fff',
                                            backgroundColor: '#84ABF7',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            margin: '0 0 0 2px'
                                        }}><PlusOutlined />
                                    </Avatar>
                                </button>
                            </div>
                        </div>

                        {/* new */}
                        {/* deadline box */}
                        {openDeadline ? (
                            <div className="memeber-deadline" style={{ marginLeft: "20px" }}>
                                <div>NG??Y H???T H???N</div>
                                <div className="box-deadline">
                                    <div className="time-deadline">
                                        <Checkbox on checked={done} onChange={onChangeCheckColor} />
                                        <span>
                                            {endDate}
                                        </span>
                                        {done ? (
                                            <span className="check-done">Done !</span>
                                        ) : (
                                            <div />
                                        )}
                                        <Dropdown
                                            trigger="click"
                                            overlay={
                                                <Button
                                                    onClick={handleDeleteDeadline}
                                                    className="butDelete-Deadline"
                                                >
                                                    Delete Deadline
                                                </Button>
                                            }
                                            placement="bottomRight"
                                            arrow
                                        >
                                            <DownOutlined style={{ marginLeft: "7px" }} />
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>

                    {/* Ti??u ????? m?? t???: icon v?? ch??? m?? t??? chi ti???t */}
                    <div className="card-left__description flex mb-10">
                        <MenuOutlined className="common-icon width-10" />
                        <div className="des-name">M?? t??? chi ti???t</div>
                    </div>

                    {/* ?? input nh???p m?? t??? */}
                    <div className="card-left__des-input flex mb-10">
                        <div className="width-10"></div>
                        <input style={{ padding: "0 0 0 10px" }} className="des-input" placeholder="M?? t??? c??ng vi???c" />
                    </div>

                    {/* Ti??u ????? b??nh lu???n (Icon v?? Ch??? B??nh Lu???n) */}
                    <div className="card-left__cmt flex mb-10" style={{ marginTop: "40px" }}>
                        <MessageOutlined className="width-10 common-icon" />
                        <div className="cmt-name">
                            <div>B??nh lu???n</div>
                            <Button>???n chi ti???t</Button>
                        </div>
                    </div>

                    {/* Vi???t b??nh lu??n (Avatar v?? ?? input) */}
                    <div className="card-left__cmt flex mb-10">
                        {/* <div className="width-10 avatar">L</div> */}
                        <Avatar
                            style={{
                                color: '#fff',
                                backgroundColor: '#84ABF7',
                                fontSize: '12px',
                                fontWeight: '500',
                                margin: '5px 15px 0 12px'
                            }}>L
                        </Avatar>
                        <input onChange={commentOnChange} value={contentCmt} style={{ padding: "0 0 0 10px" }} className="cmt-input" placeholder="Vi???t B??nh Lu???n" />
                    </div>

                    {/* N??t b??nh lu???n */}
                    <div className="flex mb-10">
                        <div className="width-10"></div>
                        <Button onClick={postComment}>L??u</Button>
                    </div>


                    {/* N???i dung b??nh lu???n (avatar v?? n???i dung b??nh lu???n) */}
                    {
                        comments.map((obj, index) => (
                            <div key={index} className="card-left__cmt-content flex mb-10">
                                {/* avatar*/}
                                <Avatar
                                    style={{
                                        color: '#fff',
                                        backgroundColor: '#84ABF7',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        margin: '5px 15px 0 12px'
                                    }}>{(obj.fullName) ? obj.fullName.charAt(0).toUpperCase() : ""}
                                </Avatar>
                                {/* N???i dung b??nh lu???n: t??n, ng??y, n???i dung, reaction, s???a, xo?? */}
                                <div className="cmt-right">
                                    <div className="cmt-user">
                                        {/* T??n ng?????i b??nh lu???n */}
                                        {obj.fullName}
                                        <span className="cmt-date">
                                            {/* Ng??y b??nh lu???n */}
                                            {obj.createDate}
                                        </span>
                                    </div>
                                    <div className="cmt-content">
                                        {/* N???i dung b??nh lu???n */}
                                        {obj.content}
                                    </div>
                                    <div className="cmt-react">
                                        <SmileOutlined /> - Ch???nh s???a - Xo??
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                {/* B??n ph???i modal: c??c ch???c n??ng */}
                <div className="card-right">
                    <div className="btn-right">
                        <Button onClick={btnAddMemberOnClick} style={{ width: "100%" }}>
                            <UserAddOutlined />
                            Th??nh vi??n
                        </Button>
                        <Modal width={400} centered title="" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <center style={{ marginTop: "7px", fontSize: "14px" }}>Th??m th??nh vi??n v??o b???ng</center>
                            <hr className="hr" />
                            <div className="title-member-board">Th??nh vi??n c???a b???ng</div>

                            {/* Danh sachs th??nh vi??n trong b???ng nh??ng ko c?? trong task */}
                            {
                                userNoTask.map((obj, index) => (
                                    <div key={index} className="memeber-list">
                                        <button onClick={() => btnAddMemberTask(obj)} className="btn-member-task">
                                            <Avatar className="avatar">{(obj.fullName) ? (obj.fullName.charAt(0).toUpperCase()) : ""}</Avatar>
                                            {obj.fullName}
                                        </button>
                                    </div>
                                ))
                            }
                        </Modal>
                    </div>

                    {/* new */}
                    {/* Deadline */}
                    <div className="btn-right">
                        <Button onClick={showModalDead} style={{ width: "100%" }}>
                            <FieldTimeOutlined />
                            Ng??y
                        </Button>
                        <Modal
                            width={300}
                            title="Deadline"
                            visible={isModalDeadVisible}
                            footer={null}
                            onCancel={handleCancelDead}
                        >
                            <div>
                                <Form>
                                    <div className="title-date">
                                        <h4>Start Date</h4>
                                        <h4 style={{ marginLeft: "68px" }}>End Date</h4>
                                    </div>
                                    <RangePicker
                                        defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                                        format={dateFormat}
                                        onChange={getDateValue} />
                                    <br />
                                    <Button
                                        onClick={handleSaveDeadline}
                                        style={{ marginTop: "15px" }}
                                        type="primary"
                                    >
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </Modal>
                    </div>

                    <div className="btn-right">
                        <Button onClick={chooseImage} style={{ width: "100%" }}>
                            <PictureOutlined />
                            ???nh B??a
                        </Button>
                        <div id="modal-picture" className="modal-member isHide">
                            <button onClick={btnCloseImageOnClick} className="btnClose">X</button>
                            <center style={{ marginTop: "7px", fontSize: "14px" }}>???nh b??a</center>
                            <hr className="hr" />
                            <div className="title-member-board">T???p ????nh K??m</div>

                            <input onChange={imageOnChange} style={{ marginLeft: "13px" }} type="file" accept="image/*" />
                            <Button onClick={btnUploadImageOnClick} style={{ width: "90%", margin: "20px 0 0 13px" }}>Upload</Button>
                            <img className={(image === "" || image === null) ? "isHide" : ""} style={{ width: "150px", height: "150px", margin: "10px 0 0 40px" }} src={(image) ? image : ""} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task;