import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import UserInfo from "../../UserInfo/UserInfo";

class UserInfoSeller extends React.Component{

    render(){
        return (
            <MainLayout onLogOut={this.props.onLogOut}>
                <UserInfo/>
            </MainLayout>
        );
    }
}

export default UserInfoSeller;