import React, { useState, useEffect } from "react";
import "./table.css";
import dayjs from "dayjs";
import TablePagination from "@mui/material/TablePagination";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default function TableRepo(props) {
  const { listRepo = [] } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(listRepo);
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = useState({});
  console.log(detail, "detail");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filterData = (val) => {
    const testing = listRepo.filter((item, index) => index < val);
    setData(testing);
  };

  const paginationData = (val) => {
    const pageSet = val + 1;
    const limitUp = rowsPerPage * pageSet;
    const limitDown = limitUp - rowsPerPage;

    let dataSet;
    if (pageSet === 1) {
      dataSet = listRepo.filter((item, index) => {
        return index < limitUp && index >= limitDown;
      });
    } else {
      const newLimit = limitDown + 1;

      dataSet = listRepo.filter((item, index) => {
        return index <= limitUp && index >= newLimit;
      });
    }

    setData(dataSet);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    paginationData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    filterData(event.target.value);
  };

  useEffect(() => {
    filterData(5);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="table-container">
      <table id="repo-list">
        <tr>
          <th>Id</th>
          <th>Repository Name</th>
          <th>Programming Language</th>
          <th>Action</th>
        </tr>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.language}</td>
            <td
              className="td-detail"
              onClick={() => {
                  setDetail(item);
                  handleOpen();
              }}
            >
              detail
            </td>
          </tr>
        ))}
      </table>
      <div className="pagination-container">
          <TablePagination
              component="div"
              count={listRepo.length}
              page={page}
              onPageChange={(page, value) => {
                  handleChangePage(value);
              }}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </div>

      <div>
          <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                  timeout: 500,
              }}
          >
              <Fade in={open}>
                  <Box sx={style}>
                      <div className="modal-repo">
                          <div className="detail-repo">
                              <div className="content-name">ID</div>
                              <div className="content-value">{detail.id || "empty"}</div>
                          </div>

                          <div className="detail-repo">
                              <div className="content-name">Repository</div>
                              <div className="content-value">{detail.name || "empty"}</div>
                          </div>
                          <div className="detail-repo">
                              <div className="content-name">Programming Language</div>
                              <div className="content-value">{detail.language || "empty"}</div>
                          </div>
                          <div className="detail-repo">
                              <div className="content-name">Description</div>
                              <div className="content-value">{detail.description || "empty"}</div>
                          </div>
                          <div className="detail-repo">
                              <div className="content-name">Created Date</div>
                              <div className="content-value">
                                  {dayjs(detail.created_at).utcOffset("+07:00").format("DD/MM/YY, HH:mm")}
                              </div>
                          </div>
                          <div className="detail-repo">
                              <div className="content-name">Update Date</div>
                              <div className="content-value">
                                  {dayjs(detail.updated_at).utcOffset("+07:00").format("DD/MM/YY, HH:mm")}
                              </div>
                          </div>
                      </div>
                  </Box>
              </Fade>
          </Modal>
      </div>
    </div>
  );
}
