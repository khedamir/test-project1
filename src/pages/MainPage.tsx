import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackApi, { TreeRows } from "../API/BackApi";
import { useIdContext } from "../context/EntityContext";
import styles from "./MainPage.module.scss"
import classnames from "classnames/bind";
import { Projects, ProjectsNames } from "../API/enum";
import level1 from "../assets/svg/level1.svg"
import level2 from "../assets/svg/level2.svg";
import level3 from "../assets/svg/level3.svg";
import basket from "../assets/svg/basket.svg"
import Row from "../components/Row/Row";

const cx = classnames.bind(styles)


const MainPage: React.FC = () => {
    const eID = useIdContext().eID;
    const [TreeRows, setTreeRows] = useState<TreeRows[]>();
    const rowId = useParams().id as keyof typeof Projects;

    useEffect(() => {
        const fetchData = async () => {
            const response = await BackApi.getTreeRows(eID)
            setTreeRows(response)
        }
        if (eID) fetchData()
    }, [eID, rowId])


    if (!(TreeRows && rowId)) {
        return null
    }

    const removeRow = (id: number, level: number,  TreeRowId: number ,levelId?: number) => {
        switch (level) {
            case 1:
                let rowLevel1 = TreeRows
                rowLevel1.splice(TreeRowId, 1)
                setTreeRows([...rowLevel1]);
                break;
            case 2:
                if(!TreeRowId && TreeRowId !== 0) break;
                let Rows = TreeRows
                Rows[TreeRowId].child.splice(id, 1)
                setTreeRows([...Rows])
                break;
            case 3:
                if(!(TreeRowId && levelId) && (TreeRowId !== 0 || levelId !== 0)) break;
                let RowsLevel3 = TreeRows
                RowsLevel3[TreeRowId].child[levelId].child.splice(id, 1)
                console.log(RowsLevel3)
                setTreeRows([...RowsLevel3])
                break;
        }
    }

    const createRow = (eID: number, obj:{}) => {
        const fetchData = async () => {
            await BackApi.createRow(eID, obj)
            const response = await BackApi.getTreeRows(eID)
            setTreeRows(response)
        }
        fetchData()
    }

    const updateRow = (rID: number, obj: {}) => {
        const fetchData = async () => {
            await BackApi.updateRow(eID, rID, obj)
            const response = await BackApi.getTreeRows(eID)
            setTreeRows(response)
        }
        fetchData()
    }


    return (
        <div className={cx(styles.MainPage)}>
            <header>
                <p>{ProjectsNames[Projects[rowId]]}</p>
            </header>
            <ul className={cx(styles.Row)}>
                <li>Уровень</li>
                <li>Наименования работ</li>
                <li>Основная з/п</li>
                <li>Оборудование</li>
                <li>Накладные расходы</li>
                <li>Сметная прибыль</li>
            </ul>
            {TreeRows.map((TreeRow, TreeRowid) =>
                <div key={TreeRow.id} className={cx(styles.TreeRows)}>
                    <Row 
                        TreeRowId = {TreeRowid}
                        id={TreeRowid} 
                        icons={[{ img: level2, action: "create" }, { img: level3, action: "create" }, { img: basket, action: "delete" }]} 
                        row={TreeRow} 
                        img={level1} padding="15px" 
                        remove={removeRow}
                        create = {createRow}
                        update = {updateRow}
                        level = {1}/>

                    {TreeRow.child.map((row, levelId) =>
                        <div key={row.id}>

                            <Row 
                                TreeRowId = {TreeRowid}
                                id={levelId} 
                                icons={[{ img: level3, action: "create" }, { img: basket, action: "delete" }]} 
                                row={row} 
                                img={level2} padding="35px" 
                                remove={removeRow}
                                create = {createRow}
                                update = {updateRow}
                                level={2}/>

                            {row.child.map((r, id) =>
                                <Row
                                    TreeRowId = {TreeRowid}
                                    key={r.id} 
                                    levelId={levelId} 
                                    id={id} 
                                    icons={[{ img: basket, action: "delete" }]} 
                                    row={r} 
                                    img={level3} padding="56px" 
                                    remove={removeRow}
                                    update = {updateRow}
                                    create = {createRow}
                                    level={3}/>
                            )}
                        </div>
                    )}
                </div>
            )}
            {!(TreeRows.length) && <p>Пока пусто</p>}
        </div>
    )
}

export default MainPage;