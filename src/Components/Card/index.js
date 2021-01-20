import React from "react";

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
                        props.sex === "Male" ? "#FFFFFF" : "rgb(175,175,175)",
                }}
            >
            </div>
            <div className={styles.content}>
                <h3>{props.name ? props.name : null}</h3>
                <p>
                    <span className={styles.bold}>Sex: </span>
                    {props.username ? props.sex : null}
                </p>
                <p>
                    <span className={styles.bold}>Username: </span>
                    {props.username ? props.username : null}
                </p>
                <p>
                    <span className={styles.bold}>Phone No.: </span>
                    {props.phoneNumber ? props.phoneNumber : null}
                </p>
                <p>
                    <span className={styles.bold}>Payment Type: </span>
                    {props.paymentMethod ? props.paymentMethod : null}
                </p>
            </div>
        </div>
    );
}

export default index;
