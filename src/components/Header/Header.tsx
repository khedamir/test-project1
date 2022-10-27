import React from "react";
import styles from "./Header.module.scss"
import classnames from "classnames/bind";
import { ReactComponent as MenuIcon } from "../../assets/svg/menu-icon.svg"
import { ReactComponent as ArrowBack } from "../../assets/svg/arrow-back.svg"


const cx = classnames.bind(styles)


const Header: React.FC = () => {
return (
        <div className={cx(styles.header)}>
            <ul className={cx(styles.navItems)}>
                <li className={cx(styles.navItem)}><a href=""><MenuIcon className={cx(styles.menuIcon)} /></a></li>
                <li className={cx(styles.navItem)}><a href=""><ArrowBack className={cx(styles.arrowBack)} /></a></li>
                <li className={cx(styles.navItem)}><a href="">Просмотр</a></li>
                <li className={cx(styles.navItem)}><a href="">Управление</a></li>
            </ul>
            
        </div>
    )
}

export default Header;