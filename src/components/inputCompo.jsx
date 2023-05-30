import { useSnackbar } from "notistack";
import { useState } from "react";

import AlbumDataService from "../services/service";

function InputCompo({ albumData, setAlbumData }) {
  const [albumName, setAlbumName] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const addAlbumData = () => {
    AlbumDataService.create({
      userId: 1,
      title: albumName,
    })
      .then((response) => {
        albumName
          ? enqueueSnackbar("Album added successfully", {
              variant: "success",
            })
          : enqueueSnackbar("Album name can't be empty", {
              variant: "error",
            });

        albumName &&
          setAlbumData([
            { ...response.data, id: albumData.length + 1 },
            ...albumData,
          ]);

        setAlbumName("");
      })
      .catch((e) => {
        console.log(e);

        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
  };

  return (
    <div id="input">
      <form className="input-form">
        <input
          name="albumNmae"
          type="text"
          placeholder="write album name here ..."
          value={albumName}
          required
          onChange={(e) => setAlbumName(e.target.value)}
        />

        <button
          type="submit"
          id="form-btn"
          onClick={(e) => {
            e.preventDefault();
            addAlbumData();
          }}
        >
          + Add your album
        </button>
      </form>
    </div>
  );
}

export default InputCompo;
