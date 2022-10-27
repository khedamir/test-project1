import React from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames";
import icon from "../../assets/svg/icon.svg"
import navbarIcon from "../../assets/svg/navbar-icon.svg"
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)

interface Project {
    id: number;
    name: string;
}

const projects: Project[] = [
    { id: 1, name: "По проекту" },
    { id: 2, name: "Объекты" },
    { id: 3, name: "РД" },
    { id: 4, name: "МТО" },
    { id: 5, name: "СМР" },
    { id: 6, name: "График" },
    { id: 7, name: "МиМ" },
    { id: 8, name: "Рабочие" },
    { id: 9, name: "Капвложения" },
    { id: 10, name: "Бюджет" },
    { id: 11, name: "Финансирование" },
    { id: 12, name: "Панорамы" },
    { id: 13, name: "Камеры" },
    { id: 14, name: "Поручения" },
    { id: 15, name: "Контрагенты" },
]

const Navbar: React.FC = () => {
    return (
        <div className={cx(styles.navBar)}>
            <header className={cx(styles.navHeader)}>
                <div>
                    <h3>Название проекта</h3>
                    <p>Аббревиатура</p>
                </div>
                <img src={icon} alt="" />
            </header>
            <ul className={cx(styles.navBarItems)}>
                {projects.map((project) =>
                    <li key={project.id}>
                        <Link to={`/${project.id}`}>
                            <img src={navbarIcon} alt="" />
                            <p>{project.name}</p>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Navbar;