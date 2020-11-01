import { useEffect } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import MainContainer from "../components/Layout elements/MainContainer";
import GridContainer from "../components/Layout elements/GridContainer/GridContainer";
import GridColumn from "../components/Layout elements/GridContainer/GridColumn";
function Home() {
  return (
    <MainContainer>
      <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, dolor aut nemo autem, reiciendis minus ut mollitia voluptatum deleniti, tempora fuga accusamus optio eos pariatur voluptates placeat. Dolorem rerum odit dolor ratione tenetur eum fugit eveniet cumque ducimus. Culpa, nulla doloremque. Tempore quidem, libero quo earum eos</h4>
      <GridContainer>
        <GridColumn><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sed sit autem, impedit inventore necessitatibus illo, ut rem laborum exercitationem suscipit quas vitae doloribus enim? Aliquid, suscipit, molestiae nam temporibus vel voluptatum eligendi, natus unde reiciendis eum labore accusamus ex perferendis exercitationem ipsum! Perferendis, molestias? Consequatur pariatur quaerat quod quisquam?</p></GridColumn>
        <GridColumn><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit optio quam doloremque eos, molestias iste culpa assumenda praesentium labore nulla iusto quas perspiciatis qui nihil voluptatum recusandae est facere magnam eius natus nam nemo repudiandae quibusdam saepe. Illum architecto earum pariatur? Voluptas, voluptatibus suscipit. Architecto ad reiciendis sint. Sit, magni?</p></GridColumn>
      </GridContainer>
    </MainContainer>
    );
}

export default Home;
