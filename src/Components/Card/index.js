import React from "react";
import Skeleton from "react-loading-skeleton";
import { withRouter } from "react-router-dom";

import styles from "./style.module.scss";

function index(props) {
    return (
        <div
            className={[
                styles.container,
                props.darkMode ? styles.darkMode : styles.lightMode,
            ].join(" ")}
        >
            <div
                className={styles.img}
                style={{
                    backgroundImage: `url('${props.gender}')`,
                    backgroundColor:
                        props.sex === "Male"
                            ? "#FFFFFF"
                            : "rgb(175,175,175)",
                }}
            >
                {props.gender ? null : <Skeleton />}
            </div>
            <div className={styles.content}>
                <h3>{props.name ? props.name : <Skeleton />}</h3>
                <p>
                    <span className={styles.bold}>Username: </span>
                    {props.username ? props.username : <Skeleton />}
                </p>
                <p>
                    <span className={styles.bold}>Phone No.: </span>
                    {props.phoneNumber ? props.phoneNumber : <Skeleton />}
                </p>
                <p>
                    <span className={styles.bold}>Payment Type: </span>
                    {props.paymentMethod ? props.paymentMethod : <Skeleton />}
                </p>
            </div>
        </div>
    );
}

export default withRouter(index);
