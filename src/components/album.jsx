import { useSnackbar } from "notistack";
import AlbumDataService from "../services/service";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function AlbumsCompo({ albumData, setAlbumData }) {
  return (
    <div className="album-display__width">
      <ul className="album-list ">
        <li className=" grid-container">
          {albumData.map((item, index) => (
            <SingleAlbumCompo
              key={index}
              singleAlbum={item}
              setAlbumData={setAlbumData}
              albumData={albumData}
            />
          ))}
        </li>
      </ul>
    </div>
  );
}

function SingleAlbumCompo({ singleAlbum, setAlbumData, albumData }) {
  const { enqueueSnackbar } = useSnackbar();
  var temp = singleAlbum.title;

  const updateAlbumData = (id, data) => {
    AlbumDataService.update(id, data)
      .then((response) => {
        setAlbumData((existingItems) => {
          const itemIndex = existingItems.findIndex(
            (item) => item.id === singleAlbum.id
          );

          return [
            ...existingItems.slice(0, itemIndex),
            {
              ...existingItems[itemIndex],
              title: temp,
            },
            ...existingItems.slice(itemIndex + 1),
          ];
        });

        enqueueSnackbar(
          singleAlbum.isedit ? "Removed from edit" : "Added to edit",
          { variant: "success" }
        );
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
  };

  const deleteAlbumData = (id) => {
    AlbumDataService.delete(id)
      .then((response) => {
        setAlbumData((existingItems) => {
          const itemIndex = existingItems.findIndex(
            (item) => item.id === singleAlbum.id
          );

          return [
            ...existingItems.slice(0, itemIndex),
            ...existingItems.slice(itemIndex + 1),
          ];
        });
        enqueueSnackbar("Album deleted successfully", { variant: "success" });
      })
      .catch((e) => {
        console.log(e);

        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
  };

  return (
    <div className="album-lst grid-item">
      <div className="album-list-item">
        <div className="album-list-item-name">{singleAlbum.title}</div>

        <div className="actions">
          <Popup
            trigger={<i className="fa-solid fa-edit edit"></i>}
            modal
            nested
          >
            {(close) => (
              <div id="input">
                <form className="input-form">
                  <input
                    name="albumNmae"
                    type="text"
                    placeholder={temp}
                    required
                    onChange={(e) => {
                      temp = e.target.value;
                    }}
                  />

                  <button
                    type="submit"
                    id="form-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      updateAlbumData(singleAlbum.id, { title: temp });
                      close();
                    }}
                  >
                    Update album
                  </button>
                </form>
              </div>
            )}
          </Popup>

          <div
            onClick={() => {
              deleteAlbumData(singleAlbum.id);
            }}
          >
            <i className="fa-solid fa-trash remove"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumsCompo;
