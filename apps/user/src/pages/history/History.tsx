import DefaultLayout from "@layouts/DefaultLayout";
import HeaderHistory from "@components/history/HeaderHistory";
import NavBar from "@components/common/NavBar";

export default function History(){
    return(
        <DefaultLayout header={<HeaderHistory />} footer={<NavBar />}>


        </DefaultLayout>
    );
}

