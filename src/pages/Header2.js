import React from 'react';
import {  LockOutlined , PlusOutlined} from '@ant-design/icons';
import {Button, Layout,  Avatar , Menu, Dropdown} from 'antd';

function Header2() {
    const styleHead2 = {
        background: '#6D8DDF',
        height: '60px',
        marginTop: '6px',
        padding: '0px'
    };
    const styleButton = {
        margin:'auto 5px',
        background: '#B9CFFB',
        color:'#fff', 
        fontWeight:'bold', 
        height:'40px',
        border: 'none',
    };
    const styleAvatar = {
        color: '#000',
        backgroundColor: '#fff',
        fontSize: '12px',
        fontWeight: '500',
        margin: 'auto 1px auto 0'
    };
    const styleAvatarPlus = {
        color: '#fff',
        backgroundColor: '#84ABF7',
        fontSize: '12px',
        fontWeight: '500',
        margin: 'auto 0'  
    };
    const { Header} = Layout;
    const menu = (
        <Menu >
          <Menu.Item>
            Change Theme
          </Menu.Item>
          <Menu.Item>
            Hide Board
          </Menu.Item>
        </Menu>
      );
    return (
        <Header style={styleHead2}>
            <div style={{margin:'auto 10px', display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <Button style={styleButton}>Name</Button>
                        <Button style={styleButton}><LockOutlined /> Private</Button>
                        <Avatar style={styleAvatar}> H </Avatar>
                        <Avatar style={styleAvatar}> L </Avatar>
                        <Avatar style={styleAvatarPlus}>
                            <PlusOutlined/>1 
                        </Avatar>
                        <Button style={styleButton}>Invite</Button>
                    </div>   
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Button style={styleButton}>Menu</Button>
                    </Dropdown>    
            </div>
            
        </Header>
    )
}

export default Header2
