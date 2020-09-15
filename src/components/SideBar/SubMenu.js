import React, {useState} from "react";
import classes from "./SideBar.module.css";
import NotesIcon from "@material-ui/icons/Notes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import {Link} from "react-router-dom";
import {Collapse} from "@material-ui/core";
const SubMenu = ({option,key}) => {

    const [expand, setExpand] = useState(false);
    const section = option.section;
    const operations = option.operations
    return(

            <div className={classes.item} key={key} onClick={() => setExpand(!expand)}>
                <NotesIcon fontSize={"small"}/> {section} {expand?<ExpandLessIcon/>:<ExpandMoreIcon/>}
                {expand ? operations.map((operation) =>
                    <Collapse in={expand}>
                        <div className={classes.menuItem}>
                            {operation.includes("Add")?<AddOutlinedIcon/>:<SearchOutlinedIcon/>}
                            <Link to={operation.includes("Add")?"/"+section.toLowerCase()+"/add":"/"+section.toLowerCase()+"/browse"}
                                  style={{ textDecoration: 'none' , color: '#F1FAEE'}}>
                                {operation}
                            </Link>
                        </div>
                    </Collapse>
                    ):null}
            </div>

)
}

export default SubMenu;