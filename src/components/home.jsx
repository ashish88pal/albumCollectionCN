import { useSnackbar } from "notistack";
import InputCompo from "./inputCompo";

import { useEffect, useState } from "react";
import "../assets/css/home.css";
import emptyImage from "../assets/images/bored.png";
import logo from "../assets/images/logo.png";

import AlbumDataService from "../services/service";
import AlbumsCompo from "./album";

function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const [albumData, setAlbumData] = useState([]);

  useEffect(() => {

    console.log("executed only once!");
    getAllAlbumData();
  }, []);

  const [isLoading, setLoading] = useState(true);

  const getAllAlbumData = () => {
    AlbumDataService.getAll()
      .then((response) => {
        setAlbumData(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 1200);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
        setLoading(false);
      });
  };

  return (
    <div className="row ">
      <div className="leftColumn ">
        <h1 id="title">Manage Your Albums Here</h1>

        <img src={logo} alt="logo" style={{}} />
        <InputCompo albumData={albumData} setAlbumData={setAlbumData} />

      </div>

      <div className="rightColumn">
        {!isLoading && albumData.length !== 0 ? (
          <AlbumsCompo albumData={albumData} setAlbumData={setAlbumData} />
        ) : (
          <div style={{ height: "100%" }}>
            <img src={emptyImage} alt="empty" style={{ height: "75%" }} />

            <p style={{ color: "white", fontSize: "30px" }}>
              {isLoading ? "Loading..." : "No albums ☹️"}
            </p>
            <div class="lds-loading">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
