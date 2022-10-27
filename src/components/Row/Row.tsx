import React, { useState } from "react";
import BackApi, { TreeRows } from "../../API/BackApi";
import styles from "./Row.module.scss"
import classnames from "classnames/bind";
import line from "../../assets/svg/line.svg"
import { useIdContext } from "../../context/EntityContext";

const cx = classnames.bind(styles)

interface RowProps {
    row: TreeRows;
    id: number;
    img: string;
    padding: string;
    icons: {img:string, action: string}[]
    level: number;
    levelId?: number;
    TreeRowId: number;
    remove: (id: number,level: number, TreeRowId: number, levelId?: number) => void;
    create: (eID: number,obj: {} ) => void;
    update: (rID:number, obj: {} ) => void;
}

const Row: React.FC<RowProps> = ({ row, img, padding, icons, levelId, level , remove, create, update, id, TreeRowId}) => {
    const [rowActive, setRowActive] = useState(false);
    const eID = useIdContext().eID;
    const [updateActive, setUpdateActive] = useState(false);

    const [rowValues, setRowValues] = useState({
        rowName: row.rowName,
        salary: row.salary,
        equipmentCosts: row.equipmentCosts,
        overheads: row.overheads,
        estimatedProfit: row.estimatedProfit,
    })


    const Action = (rID: number, action: string) => {
        if (action === "delete") {
            const fetchData = async () => {
                await BackApi.deleteRow(eID, rID)
            }
            fetchData()
            remove(id, level, TreeRowId, levelId)
        }
        if (action === "create") {
            let obj = {
                equipmentCosts: 0,
                estimatedProfit: 0,
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: 0,
                parentId: level === 1? null : rID,
                rowName: "",
                salary: 0,
                supportCosts: 0
            }
            create(eID, obj)
        }
    }


    const updateRow = (key: string) => {
        if(key === "Enter"){
            update(row.id, {
                equipmentCosts: Number(rowValues.equipmentCosts),
                estimatedProfit: Number(rowValues.estimatedProfit),
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: Number(rowValues.overheads),
                rowName: rowValues.rowName,
                salary: Number(rowValues.salary),
                supportCosts: 0
            })
            setUpdateActive(false)
            console.log("Hi")
        }
    }

    return (
        <ul className={cx(styles.Row)}
            onDoubleClick={() => setUpdateActive(!updateActive)}>
            <li
                onMouseOver={() => setRowActive(true)}
                onMouseOut={() => setRowActive(false)}
                style={{ paddingLeft: padding }}
                className={cx(styles.level, rowActive && styles.levelActive)}>

                <img
                    onClick={() => Action(row.id, "create")} 
                    style={{ left: `calc(${padding} - 6px)` }} src={line} alt="" className={cx(styles.Line)} />
                <div>
                    <img src={img} alt="" className={cx(styles.Icon)} />
                    {icons.map((icon, id) =>
                        <img 
                            key={id}
                            onClick={() => Action(row.id, icon.action)}
                            src={icon.img} alt="" 
                            className={cx(styles.dopIcon)} />
                    )}
                </div>
            </li>
            <li className={cx(updateActive && styles.rowActive)}>
                <span>{row.rowName}</span>
                <input 
                    type="text" value={rowValues.rowName} 
                    onChange = {event => setRowValues({...rowValues, rowName: event.target.value})} 
                    onKeyDown = {event => updateRow(event.key)}/>
                    
            </li>
            <li className={cx(updateActive && styles.rowActive)}>
                <span>{row.salary}</span>
                <input 
                    type="text" value={rowValues.salary} 
                    onChange = {event => setRowValues({...rowValues, salary: Number(event.target.value)})} 
                    onKeyDown = {event => updateRow(event.key)}/>
            </li>
            <li className={cx(updateActive && styles.rowActive)}>
                <span>{row.equipmentCosts}</span>
                <input 
                    type="text" value={rowValues.equipmentCosts} 
                    onChange = {event => setRowValues({...rowValues, equipmentCosts: Number(event.target.value)})} 
                    onKeyDown = {event => updateRow(event.key)}/>
            </li>
            <li className={cx(updateActive && styles.rowActive)}>
                <span>{row.overheads}</span>
                <input 
                    type="text" value={rowValues.overheads} 
                    onChange = {event => setRowValues({...rowValues, overheads: Number(event.target.value)})} 
                    onKeyDown = {event => updateRow(event.key)}/>
            </li>
            <li className={cx(updateActive && styles.rowActive)}>
                <span>{row.estimatedProfit}</span>
                <input 
                    type="text" value={rowValues.estimatedProfit} 
                    onChange = {event => setRowValues({...rowValues, estimatedProfit: Number(event.target.value)})}
                    onKeyDown = {event => updateRow(event.key)}/>
            </li>
        </ul>
    )
}

export default Row;