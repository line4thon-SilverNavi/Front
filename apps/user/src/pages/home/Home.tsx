import * as s from "./Home_styled";
import DefaultLayout from "@components/common/DefaultLayout";

const Home = () => {
  return (
    <DefaultLayout>
      <s.HomeWrapper>
        "홈페이지입니다."
      </s.HomeWrapper>
    </DefaultLayout>
  );
};

export default Home;
