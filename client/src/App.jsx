import Header from "./components/Header";
import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import { Container } from "@mui/material";

export default function App() {
    return (
        <>
            <Header />
            <Banner />
            <Container>
                <CourseList />
            </Container>
        </>
    )
}