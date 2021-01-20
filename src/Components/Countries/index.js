import React, { Component } from "react";
import Card from "../Card";
import Searchs from "../Searchs";
import Spinner from "../Spinner";
import Info from "../Info";
import Pagination from "./../Pagination";

import Male from "./../../assets/images/male.svg";
import Female from "./../../assets/images/female.svg";

import styles from "./style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);

        // Sets up our initial state
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            records: [],
            totalRecords: [],
            lap: 0,
            filter: "",
            info: {},
            active: false,
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URI)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    totalRecords: result.records.profiles,
                    records: result.records.profiles,
                });
            });
    }

    filterUsers = (category) => {
        if (category === "") {
            return this.setState({ records: this.state.totalRecords });
        }
        if (category === "male") {
            let flteredData = this.state.totalRecords.filter(
                (patient) => patient.Gender === "Male"
            );
            return this.setState({ records: flteredData });
        }
        if (category === "female") {
            let flteredData = this.state.totalRecords.filter(
                (patient) => patient.Gender === "Female"
            );
            return this.setState({ records: flteredData });
        }
        if (category === "pos") {
            let flteredData = this.state.totalRecords.filter(
                (patient) => patient.Gender === "Prefer to skip"
            );
            return this.setState({ records: flteredData });
        }
        if (category === "cc") {
            let flteredData = this.state.totalRecords.filter(
                (patient) => patient.PaymentMethod === "cc"
            );
            return this.setState({ records: flteredData });
        }
        if (category === "check") {
            let flteredData = this.state.totalRecords.filter(
                (patient) => patient.PaymentMethod === "check"
            );
            return this.setState({ records: flteredData });
        }
        if (category === "paypal") {
            let flteredData = this.state.totalRecords.filter(
                (patient) => patient.PaymentMethod === "paypal"
            );
            return this.setState({ records: flteredData });
        }
        if (category === "money order") {
            let flteredData = this.state.totalRecords.filter(
                (patient) => patient.PaymentMethod === "money order"
            );
            return this.setState({ records: flteredData });
        }
    };

    searchUser = (beginsWith) => {
        let searchedRecord = this.state.totalRecords.filter((patient) =>
            `${patient.FirstName} ${patient.LastName}`
                .toLowerCase()
                .startsWith(beginsWith.toLowerCase())
        );
        this.setState({ records: searchedRecord });
    };

    handleClick = (info) => {
        this.setState({ info });
        this.setState({ active: true });
    };

    getGenderImage = (gender) => {
        if (gender === "Male") {
            return Male;
        } else if (gender === "Female") {
            return Female;
        } else {
            return Male;
        }
    };

    setPage = (lap) => {
        this.setState({ lap });
    };

    close = () => this.setState({ active: false });

    render() {
        return (
            <>
                <Searchs
                    filterUsers={this.filterUsers}
                    searchUser={this.searchUser}
                    result={this.state.records.length}
                />
                <div
                    className={[
                        styles.container,
                        this.props.darkMode
                            ? styles.darkMode
                            : styles.lightMode,
                    ].join(" ")}
                >
                    {this.state.records.length ? (
                        this.state.records
                            .slice(
                                this.state.lap * 20,
                                this.state.lap * 20 + 20
                            )
                            .map((profile, index) => (
                                <div
                                    className={styles.info}
                                    key={index}
                                    onClick={() => this.handleClick(profile)}
                                >
                                    <Card
                                        name={`${profile.FirstName} ${profile.LastName}`}
                                        gender={this.getGenderImage(
                                            profile.Gender
                                        )}
                                        sex={profile.Gender}
                                        username={profile.UserName}
                                        phoneNumber={profile.PhoneNumber}
                                        paymentMethod={profile.PaymentMethod}
                                    />
                                </div>
                            ))
                    ) : (
                        <Spinner />
                    )}
                </div>
                <Info
                    info={this.state.info}
                    open={this.state.active}
                    close={this.close}
                />
                <Pagination
                    unit={this.state.records.length}
                    setPage={this.setPage}
                />
            </>
        );
    }
}

export default Index;
