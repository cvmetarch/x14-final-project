import React from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import CourseList from "../../components/CourseList";
import FormModal from "../../components/Modal";
import AlertMessage from "../../components/AlertMessage";
import { Container } from "@mui/material";

export default function Home() {
    return (
        <React.Fragment>
            <Header />
            <Banner />
            <Container>
                <CourseList />
                <FormModal />
                <AlertMessage />
            </Container>
        </React.Fragment>
    );
}