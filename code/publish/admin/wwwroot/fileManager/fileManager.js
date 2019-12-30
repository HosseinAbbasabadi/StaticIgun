const host = "https://localhost:5001";
const fileManagerApiEndpoint = "https://localhost:5001/api/FileManagere/";

function getFiles(path) {
  get(`${fileManagerApiEndpoint}ListFiles`,
    "PUT",
    {
      hostName: host,
      path: path,
      searchPattern: ""
    },
    "file",
    "#listoffiles");
}

function getDirectories(path) {
  get(`${fileManagerApiEndpoint}ListDirectories`,
    "PUT",
    {
      hostName: host,
      path: path,
      searchPattern: ""
    },
    "directory",
    "#listofdirectories");
}

function get(url, httpMethod, data, type, fileContainerDiv) {
  $.ajax(url,
    {
      type: httpMethod,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data)
    }).done(function(result) {
    handleGetCallBack(result, type, fileContainerDiv);
  }).fail(function(error) {
    alert(error);
  });
}

function handleGetCallBack(data, type, fileContainerDiv) {
  var result = '';

  switch (type) {
  case "file":
    data.forEach(function(item, index) {
      const fileDiv =
        `<div class='col-md-2 m-2 file-item' id="selectable-file-item"><img src=${item
          } class="rounded img-fluid"/></div>`;
      result += fileDiv;
    });
    break;
  case "directory":
    data.forEach(function(item, index) {
      const fileDiv =
        `<div class='col-md-2 text-center m-2 file-item' onclick="routeToDirectory('${item.path
          }')"><img src='/fileManager/folder-icon.png' class="rounded img-fluid" /><span>${item.name}</span></div>`;
      result += fileDiv;
    });
    break;
  default:
  }

  $(fileContainerDiv).html(result);

  const targetInput = localStorage.getItem("targetInput");
  if (targetInput === undefined)
    return;
  $("#selectable-file-item img").click(function() {
    const value = $(this).attr("src");
    $(`#${targetInput}`).val(value);
  });
}

function OpenFileUploader(targetInput) {
  localStorage.setItem("targetInput", targetInput);
  localStorage.setItem("currentPath", "");

  $("#fileManagerModal").modal("show");
  getFiles("", targetInput);
  getDirectories("");
}

function routeToDirectory(directoryName) {
  localStorage.setItem("currentPath", directoryName);
  getFiles(directoryName);
  getDirectories(directoryName);
  //updateBackBottun();
}

function updateBackBottun() {
  var prevDirectory = localStorage.getItem("prevDirectory");
  if (prevDirectory === "")
    prevDirectory = "root";
  const backBtn = `<button type="button" onclick="routeToDirectory('')">${prevDirectory}</button>`;
  $("#filemanager-backBtn-breadcrump").html(backBtn);
}

function upload() {
  const input = document.getElementById("fileManager-upload-file");
  const files = input.files;
  const formData = new FormData();
  for (let i = 0; i !== files.length; i++) {
    formData.append("files", files[i]);
  }

  const path = localStorage.getItem("currentPath");
  $.ajax(
    {
      url: `${fileManagerApiEndpoint}Upload?path=${path}`,
      data: formData,
      processData: false,
      contentType: false,
      type: "POST",
      success: function () {
        routeToDirectory(path);
        //if (filename === 400) {

        //}
        //sendNotification("error", "top-right", "خطا", "فایل نامعتبر است. لطفا دوباره تلاش کنید");
        //if (filename === 401) {

        //}
        //sendNotification("error", "top-right", "خطا", "حجم عکس باید کمتر از ۳ مگابایت باشد");
        //else {
        //sendNotification("success", "top-right", "موفیت", "عکس با موفقیت بارگذاری شد")
        //$('#' + deleteBtnId).removeClass("hidden");
        //$('#' + imagePropertyId).attr("value", filename);
        //}
      }
    });
}

function createDirectory(formId) {
  const path = localStorage.getItem("currentPath");
  const sendingData = $(`#${formId}`).serialize();

  $.ajax(
    {
      url: `${fileManagerApiEndpoint}CreateDirectory?path=${path}`,
      data: JSON.stringify(sendingData),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      type: "POST",
      success: function () {
        routeToDirectory(path);
      }
    });
}