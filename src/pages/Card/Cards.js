import React, { useState } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import { createTask } from '../../Api/func/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Draggable } from 'react-smooth-dnd';
import './Card.css';
import 'antd/dist/antd.css'


function Cards(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [workTask, setWorkTask] = useState("");
    const {onCardDrop} = props;
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = async () => {
        await createTask({
            workListId: props.workListId,
            title: workTask
        });
        setOpen(false);
        props.reload();
    }

    return (
        <div>
            <Container
                groupName="col"
                onDrop={dropResult => onCardDrop(props.workListId, dropResult)}
                getChildPayload={index => props.task[index]
                }
                dragClass="card-ghost"
                dropClass="card-ghost-drop"

                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'drop-preview'
                }}
                dropPlaceholderAnimationDuration={200}>
                {props.task.map((card, index) => (
                    <Draggable key={index}>
                        <div className="card-item" key={index}>
                            <Typography className="typography" onClick={showModal}>{card.title}</Typography>
                        </div>
                    </Draggable>
                ))
                }
            </Container>
            <div className="workList">
                {open ? (
                    <div>
                        <input onChange={e => setWorkTask(e.target.value)} type="text" required className="input" placeholder="Enter a title"></input>
                        <button type="button" className="button" onClick={onSubmit} >Add task</button>
                        <CloseOutlined onClick={() => setOpen(false)} style={{ cursor: 'pointer', marginLeft: '80px', fontSize: '20px' }} />
                    </div>
                ) : (
                    <button onClick={() => setOpen(!open)} className="add-task" > <PlusOutlined /> Add task</button>
                )}
            </div>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div >
    )
}

export default Cards;
