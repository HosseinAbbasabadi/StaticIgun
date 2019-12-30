function makeSlug(source, dist, url) {
  const takedata = $('#' + source).val();
  $('#' + dist).val(convertToSlug(takedata));
  checkSlugDuplication(url, dist);
}

var convertToSlug = function(str) {
  var $slug = '';
  const trimmed = $.trim(str);
  $slug = trimmed.replace(/[^a-z0-9-آ-ی-]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return $slug.toLowerCase();
};

function checkSlugDuplication(url, dist) {
  const slug = $('#' + dist).val();
  const id = convertToSlug(slug);
  $.get({
    url: url + '/' + id,
    contentType: "application/json; charset=utf-8",
    success: function(result) {
      if (result === true) {
        $('#duplicated-slug-error').removeClass("d-none");
      }
    }
  });
}

var count = 2;

function dynamicElement(parentElement) {
  const division = document.createElement("DIV");
  division.classList.add("form-group");
  division.innerHTML = dynamicCardBox(this.count);
  const prevCounter = this.count - 1;
  if (document.getElementById(`removeBtn${prevCounter}`) !== null) {
    document.getElementById(`removeBtn${prevCounter}`).classList.add("hidden");
  }
  document.getElementById(parentElement).appendChild(division);
  this.count++;
}

function dynamicCardBox(count) {
  return `<div class="input text">
              <input type="text" name="Card${count}" id="Card${count}" class="single-input" maxlength="16"/>
              <br />
              <input class="btn btn-danger btn-sm" type="button" value="حذف" onclick="removeCardBox(this)" id="removeBtn${
    count}"/>
            </div>
        `;
}

function removeCardBox(div) {
  document.getElementById("bankCards").removeChild(div.parentNode.parentNode);
  this.count--;
  if (document.getElementById(`removeBtn${this.count - 1}`) !== null) {
    document.getElementById(`removeBtn${this.count - 1}`).classList.remove("hidden");
  }
}