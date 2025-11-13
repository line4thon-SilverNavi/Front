import SearchHeader from "@components/search/SearchHeader";
import DefaultLayout from "@layouts/DefaultLayout";


export default function Search(){
    return(
        <DefaultLayout 
            header={<SearchHeader />}>
    
        </DefaultLayout>
    );
}