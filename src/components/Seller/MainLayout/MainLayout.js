import React from "react";
import styles from './MainLayout.module.css';
import Menu from "../Menu/Menu";

class MainLayout extends React.Component {

    render() {
        return (
            <div className={styles.home}>
                <div className={styles.backgroundImage}>
                    <Menu onLogOut={this.props.onLogOut}/>
                    <div className={styles.content}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default MainLayout;