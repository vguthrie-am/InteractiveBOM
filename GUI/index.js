(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*************************************************
              Board Rotation                    
*************************************************/
var storage
var storagePrefix = 'KiCad_HTML_BOM__' + pcbdata.metadata.title + '__' + pcbdata.metadata.revision + '__'

function initStorage (key) {
  try {
    window.localStorage.getItem("blank");
    storage = window.localStorage;
  } catch (e) {
    console.log("Storage init error");
    // localStorage not available
  }
  if (!storage) {
    try {
      window.sessionStorage.getItem("blank");
      storage = window.sessionStorage;
    } catch (e) {
      // sessionStorage also not available
    }
  }
}

function readStorage(key) {
  if (storage) {
    return storage.getItem(storagePrefix + '#' + key);
  } else {
    return null;
  }
}

function writeStorage(key, value) {
  if (storage) {
    storage.setItem(storagePrefix + '#' + key, value);
  }
}

/************************************************/

/*************************************************
              Highlighted Refs                    
*************************************************/
var highlightedRefs = [];

function setHighlightedRefs(refs){
    highlightedRefs = refs;
}

function getHighlightedRefs(){
    return highlightedRefs;
}
/************************************************/

/*************************************************
              Redraw On Drag                      
*************************************************/
var redrawOnDrag = true;

  
function setRedrawOnDrag(value){
    redrawOnDrag = value;
    writeStorage("redrawOnDrag", value);
}

function getRedrawOnDrag(){
    return redrawOnDrag;
}

/************************************************/


/*************************************************
BOM Split
*************************************************/
var bomsplit;

function setBomSplit(value){
    bomsplit = value;
}

function getBomSplit(){
    return bomsplit;
}

function destroyBomSplit(){
    bomsplit.destroy()
}

/************************************************/

/*************************************************
Canvas Split
*************************************************/
var canvassplit;

function setCanvasSplit(value){
    canvassplit = value;
}

function getCanvasSplit(){
    return canvassplit;
}

function destroyCanvasSplit(){
    canvassplit.destroy()
}

function collapseCanvasSplit(value)
{
    canvassplit.collapse(value);
}

function setSizesCanvasSplit(value){
    canvassplit.setSizes([50, 50]);
}

/************************************************/

/*************************************************
Canvas Layout
*************************************************/
var canvaslayout = "FB";

/*XXX Found a bug at startup. Code assumes that canvas layout 
is in one of three states. then system fails. he bug was that the 
canvasLayout was being set to 'default' which is not a valid state. 
So no is check that if default is sent in then set the layout to FB mode.
*/
/* TODO: Make the default check below actually check that the item 
is in one of the three valid states. If not then set to FB, otherwise set to one of
the three valid states
*/
function setCanvasLayout(value){
    if(value == 'default'){
        canvaslayout = 'FB'
    }
    else {
        canvaslayout = value;
    }
}

function getCanvasLayout(){
    return canvaslayout;
}

/************************************************/

/*************************************************
BOM Layout
*************************************************/
var bomlayout = "default";

function setBomLayout(value){
    bomlayout = value;
}

function getBomLayout(){
    return bomlayout;
}

/************************************************/

/*************************************************
BOM Sort Function
*************************************************/
var bomSortFunction = null;

function setBomSortFunction(value){
    bomSortFunction = value;
}

function getBomSortFunction(){
    return bomSortFunction;
}

/************************************************/

/*************************************************
Current Sort Column
*************************************************/
var currentSortColumn = null;

function setCurrentSortColumn(value){
    currentSortColumn = value;
}

function getCurrentSortColumn(){
    return currentSortColumn;
}

/************************************************/

/*************************************************
Current Sort Order
*************************************************/
var currentSortOrder = null;

function setCurrentSortOrder(value){
    currentSortOrder = value;
}

function getCurrentSortOrder(){
    return currentSortOrder;
}

/************************************************/

/*************************************************
Current Highlighted Row ID
*************************************************/
var currentHighlightedRowId;

function setCurrentHighlightedRowId(value){
    currentHighlightedRowId = value;
}

function getCurrentHighlightedRowId(){
    return currentHighlightedRowId;
}

/************************************************/

/*************************************************
Highlight Handlers
*************************************************/
var highlightHandlers = [];

function setHighlightHandlers(values){
    highlightHandlers = values;
}

function getHighlightHandlers(){
    return highlightHandlers;
}

function pushHighlightHandlers(value){
    highlightHandlers.push(value);
}

/************************************************/

/*************************************************
Checkboxes
*************************************************/
var checkboxes = [];

function setCheckboxes(values){
    checkboxes = values;
}

function getCheckboxes(){
    return checkboxes;
}

/************************************************/

/*************************************************
BOM Checkboxes
*************************************************/
var bomCheckboxes = "";

function setBomCheckboxes(values){
    bomCheckboxes = values;
}

function getBomCheckboxes(){
    return bomCheckboxes;
}

/************************************************/

/*************************************************
Highlight Pin 1
*************************************************/
var highlightpin1 = false;

function setHighlightPin1(value) {
  writeStorage("highlightpin1", value);
  highlightpin1 = value;
}

function getHighlightPin1(){
    return highlightpin1;
}

/************************************************/

/*************************************************
Last Clicked Ref
*************************************************/
var lastClickedRef;

function setLastClickedRef(value) {
    lastClickedRef = value;
}

function getLastClickedRef() {
  return lastClickedRef;
}

/************************************************/

module.exports = {
  initStorage                , readStorage                , writeStorage       ,
  setHighlightedRefs         , getHighlightedRefs         ,
  setRedrawOnDrag            , getRedrawOnDrag            ,
  setBomSplit                , getBomSplit                , destroyBomSplit    ,
  setCanvasSplit             , getCanvasSplit             , destroyCanvasSplit , collapseCanvasSplit , setSizesCanvasSplit,
  setCanvasLayout            , getCanvasLayout            ,
  setBomLayout               , getBomLayout               ,
  setBomSortFunction         , getBomSortFunction         ,
  setCurrentSortColumn       , getCurrentSortColumn       ,
  setCurrentSortOrder        , getCurrentSortOrder        ,
  setCurrentHighlightedRowId , getCurrentHighlightedRowId ,
  setHighlightHandlers       , getHighlightHandlers       , pushHighlightHandlers ,
  setCheckboxes              , getCheckboxes              ,
  setBomCheckboxes           , getBomCheckboxes           ,
  setHighlightPin1           , getHighlightPin1           ,
  setLastClickedRef          , getLastClickedRef          ,
};
},{}],2:[function(require,module,exports){

var globalData = require('./global.js')
var render     = require('./render.js')
var ibom       = require('./ibom.js')

const boardRotation = document.getElementById('boardRotation');
boardRotation.oninput=function()
{
  render.setBoardRotation(boardRotation.value);
}

const darkModeBox = document.getElementById('darkmodeCheckbox');
darkModeBox.onchange = function () {
  ibom.setDarkMode(darkModeBox.checked)
}

const silkscreenCheckbox = document.getElementById('silkscreenCheckbox');
silkscreenCheckbox.checked=function(){
  ibom.silkscreenVisible(silkscreenCheckbox.checked)
}
silkscreenCheckbox.onchange=function(){
  ibom.silkscreenVisible(silkscreenCheckbox.checked)
}

const highlightpin1Checkbox =document.getElementById('highlightpin1Checkbox');
highlightpin1Checkbox.onchange=function(){
  globalData.setHighlightPin1(highlightpin1Checkbox.checked);
  render.redrawCanvas(allcanvas.front);
  render.redrawCanvas(allcanvas.back);
}

const dragCheckbox = document.getElementById('dragCheckbox');
dragCheckbox.checked=function(){
  globalData.setRedrawOnDrag(dragCheckbox.checked)
}
dragCheckbox.onchange=function(){
  globalData.setRedrawOnDrag(dragCheckbox.checked)
}


const filter_2 = document.getElementById('filter');
filter_2.oninput=function(){
  ibom.updateFilter(filter_2.value)
}


const reflookup_2 = document.getElementById('reflookup');
reflookup_2.oninput=function(){
  ibom.updateRefLookup(reflookup_2.value)
}

const bomCheckboxes = document.getElementById('bomCheckboxes');
bomCheckboxes.oninput=function(){
  ibom.setBomCheckboxes(bomCheckboxes.value);
}

const fl_btn = document.getElementById('fl-btn');
fl_btn.onclick=function(){
  ibom.changeCanvasLayout('F');
}

const fb_btn = document.getElementById('fb-btn');
fb_btn.onclick=function(){
  ibom.changeCanvasLayout('FB');
}


const bl_btn = document.getElementById('bl-btn');
bl_btn.onclick=function(){
  ibom.changeCanvasLayout('B');
}

const bom_btn = document.getElementById('bom-btn');
bom_btn.onclick=function(){
  ibom.changeBomLayout('BOM')
}

const lr_btn = document.getElementById('lr-btn');
lr_btn.onclick=function(){
  ibom.changeBomLayout('LR')
}

const tb_btn = document.getElementById('tb-btn');
tb_btn.onclick=function(){
  ibom.changeBomLayout('TB')
}

},{"./global.js":1,"./ibom.js":3,"./render.js":4}],3:[function(require,module,exports){
/* DOM manipulation and misc code */


var Split = require('../vender/split.js')
var globalData = require('./global.js')
var render = require('./render.js')

function dbg(html) {
  dbgdiv.innerHTML = html;
}

function setDarkMode(value) {
  if (value) {
    topmostdiv.classList.add("dark");
  } else {
    topmostdiv.classList.remove("dark");
  }
  globalData.writeStorage("darkmode", value);
  render.redrawCanvas(allcanvas.front);
  render.redrawCanvas(allcanvas.back);
}

function getStoredCheckboxRefs(checkbox) {
  var existingRefs = globalData.readStorage("checkbox_" + checkbox);
  if (!existingRefs) {
    return new Set();
  } else {
    return new Set(existingRefs.split(","));
  }
}

function getCheckboxState(checkbox, references) {
  var storedRefsSet = getStoredCheckboxRefs(checkbox);
  var currentRefsSet = new Set(references);
  // Get difference of current - stored
  var difference = new Set(currentRefsSet);
  for (ref of storedRefsSet) {
    difference.delete(ref);
  }
  if (difference.size == 0) {
    // All the current refs are stored
    return "checked";
  } else if (difference.size == currentRefsSet.size) {
    // None of the current refs are stored
    return "unchecked";
  } else {
    // Some of the refs are stored
    return "indeterminate";
  }
}

function setBomCheckboxState(checkbox, element, references) {
  var state = getCheckboxState(checkbox, references);
  element.checked = (state == "checked");
  element.indeterminate = (state == "indeterminate");
}

function createCheckboxChangeHandler(checkbox, references) {
  return function() {
    refsSet = getStoredCheckboxRefs(checkbox);
    if (this.checked) {
      // checkbox ticked
      for (var ref of references) {
        refsSet.add(ref);
      }
    } else {
      // checkbox unticked
      for (var ref of references) {
        refsSet.delete(ref);
      }
    }
    globalData.writeStorage("checkbox_" + checkbox, [...refsSet].join(","));
  }
}

function createRowHighlightHandler(rowid, refs) {
  return function() {
    if (globalData.getCurrentHighlightedRowId()) {
      if (globalData.getCurrentHighlightedRowId() == rowid) {
        return;
      }
      document.getElementById(globalData.getCurrentHighlightedRowId()).classList.remove("highlighted");
    }
    document.getElementById(rowid).classList.add("highlighted");
    globalData.setCurrentHighlightedRowId(rowid);
    globalData.setHighlightedRefs(refs);
    render.drawHighlights();
  }
}

//XXX THis function has filter. Filter is not global. Where does it come from then
function entryMatches(entry) {
  // check refs
  for (var ref of entry[3]) {
    if (ref.toLowerCase().indexOf(filter) >= 0) {
      return true;
    }
  }
  // check value
  if (entry[1].toLowerCase().indexOf(filter) >= 0) {
    return true;
  }
  // check footprint
  if (entry[2].toLowerCase().indexOf(filter) >= 0) {
    return true;
  }
  return false;
}

function findRefInEntry(entry) {
  for (var ref of entry[3]) {
    if (ref.toLowerCase() == reflookup) {
      return [ref];
    }
  }
  return false;
}

function highlightFilter(s) {
  if (!filter) {
    return s;
  }
  var parts = s.toLowerCase().split(filter);
  if (parts.length == 1) {
    return s;
  }
  var r = "";
  var pos = 0;
  for (var i in parts) {
    if (i > 0) {
      r += '<mark class="highlight">' +
        s.substring(pos, pos + filter.length) +
        '</mark>';
      pos += filter.length;
    }
    r += s.substring(pos, pos + parts[i].length);
    pos += parts[i].length;
  }
  return r;
}

function checkboxSetUnsetAllHandler(checkboxname) {
  return function() {
    var checkboxnum = 0;
    while (checkboxnum < globalData.getCheckboxes().length &&
      globalData.getCheckboxes()[checkboxnum].toLowerCase() != checkboxname.toLowerCase()) {
      checkboxnum++;
    }
    if (checkboxnum >= globalData.getCheckboxes().length) {
      return;
    }
    var allset = true;
    var checkbox;
    var row;
    for (row of bombody.childNodes) {
      checkbox = row.childNodes[checkboxnum + 1].childNodes[0];
      if (!checkbox.checked || checkbox.indeterminate) {
        allset = false;
        break;
      }
    }
    for (row of bombody.childNodes) {
      checkbox = row.childNodes[checkboxnum + 1].childNodes[0];
      checkbox.checked = !allset;
      checkbox.indeterminate = false;
      checkbox.onchange();
    }
  }
}

function createColumnHeader(name, cls, comparator) {
  var th = document.createElement("TH");
  th.innerHTML = name;
  th.classList.add(cls);
  th.style.cursor = "pointer";
  var span = document.createElement("SPAN");
  span.classList.add("sortmark");
  span.classList.add("none");
  th.appendChild(span);
  th.onclick = function() {
    if (globalData.getCurrentSortColumn() && this !== globalData.getCurrentSortColumn()) {
      // Currently sorted by another column
      globalData.getCurrentSortColumn().childNodes[1].classList.remove(globalData.getCurrentSortOrder());
      globalData.getCurrentSortColumn().childNodes[1].classList.add("none");
      globalData.setCurrentSortColumn(null);
      globalData.setCurrentSortOrder(null);
    }
    if (globalData.getCurrentSortColumn() && this === globalData.getCurrentSortColumn()) {
      // Already sorted by this column
      if (globalData.getCurrentSortOrder() == "asc") {
        // Sort by this column, descending order
        globalData.setBomSortFunction(function(a, b) {
          return -comparator(a, b);
        });
        globalData.getCurrentSortColumn().childNodes[1].classList.remove("asc");
        globalData.getCurrentSortColumn().childNodes[1].classList.add("desc");
        globalData.setCurrentSortOrder("desc");
      } else {
        // Unsort
        globalData.setBomSortFunction(null);
        globalData.getCurrentSortColumn().childNodes[1].classList.remove("desc");
        globalData.getCurrentSortColumn().childNodes[1].classList.add("none");
        globalData.setCurrentSortColumn(null);
        globalData.setCurrentSortOrder(null);
      }
    } else {
      // Sort by this column, ascending order
      globalData.setBomSortFunction(comparator);
      globalData.setCurrentSortColumn(this);
      globalData.getCurrentSortColumn().childNodes[1].classList.remove("none");
      globalData.getCurrentSortColumn().childNodes[1].classList.add("asc");
      globalData.setCurrentSortOrder("asc");
    }
    populateBomBody();
  }
  return th;
}

function fancyDblClickHandler(el, onsingle, ondouble) {
  return function() {
    if (el.getAttribute("data-dblclick") == null) {
      el.setAttribute("data-dblclick", 1);
      setTimeout(function() {
        if (el.getAttribute("data-dblclick") == 1) {
          onsingle();
        }
        el.removeAttribute("data-dblclick");
      }, 200);
    } else {
      el.removeAttribute("data-dblclick");
      ondouble();
    }
  }
}

function populateBomHeader() {
  while (bomhead.firstChild) {
    bomhead.removeChild(bomhead.firstChild);
  }
  var tr = document.createElement("TR");
  var th = document.createElement("TH");
  th.classList.add("numCol");
  tr.appendChild(th);
  globalData.setCheckboxes(globalData.getBomCheckboxes().split(",").filter((e) => e));
  var checkboxCompareClosure = function(checkbox) {
    return (a, b) => {
      var stateA = getCheckboxState(checkbox, a[3]);
      var stateB = getCheckboxState(checkbox, b[3]);
      if (stateA > stateB) return -1;
      if (stateA < stateB) return 1;
      return 0;
    }
  }
  for (var checkbox of globalData.getCheckboxes()) {
    th = createColumnHeader(
      checkbox, "bom-checkbox", checkboxCompareClosure(checkbox));
    th.onclick = fancyDblClickHandler(
      th, th.onclick.bind(th), checkboxSetUnsetAllHandler(checkbox));
    tr.appendChild(th);
  }
  tr.appendChild(createColumnHeader("References", "References", (a, b) => {
    var i = 0;
    while (i < a[3].length && i < b[3].length) {
      if (a[3][i] != b[3][i]) return a[3][i] > b[3][i] ? 1 : -1;
      i++;
    }
    return a[3].length - b[3].length;
  }));
  tr.appendChild(createColumnHeader("Value", "Value", (a, b) => {
    if (a[1] != b[1]) return a[1] > b[1] ? 1 : -1;
    else return 0;
  }));
  tr.appendChild(createColumnHeader("Footprint", "Footprint", (a, b) => {
    if (a[2] != b[2]) return a[2] > b[2] ? 1 : -1;
    else return 0;
  }));

  bomhead.appendChild(tr);
}

//TODO: This should be rewritten to interact with json using the tags instead of 
//      having all of the elements hardcoded.
function populateBomBody() {
  while (bom.firstChild) {
    bom.removeChild(bom.firstChild);
  }
  globalData.setHighlightHandlers([]);
  globalData.setCurrentHighlightedRowId(null);
  var first = true;
  console.log(globalData.getCanvasLayout())
  switch (globalData.getCanvasLayout()) {
    case 'F':
      bomtable = pcbdata.bom.F;
      break;
    case 'FB':
      bomtable = pcbdata.bom.both;
      break;
    case 'B':
      bomtable = pcbdata.bom.B;
      break;
  }
  if (globalData.getBomSortFunction()) {
    bomtable = bomtable.slice().sort(globalData.getBomSortFunction());
  }
  for (var i in bomtable) {
    var bomentry = bomtable[i];
    if (filter && !entryMatches(bomentry)) {
      continue;
    }
    var references = bomentry[2];
    if (reflookup) {
      references = findRefInEntry(bomentry);
      if (!references) {
        continue;
      }
    }
    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    var rownum = +i + 1;
    tr.id = "bomrow" + rownum;
    td.textContent = rownum;
    tr.appendChild(td);
    // Checkboxes
    for (var checkbox of globalData.getCheckboxes()) {
      if (checkbox) {
        td = document.createElement("TD");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.onchange = createCheckboxChangeHandler(checkbox, references);
        setBomCheckboxState(checkbox, input, references);
        td.appendChild(input);
        tr.appendChild(td);
      }
    }
    //INFO: The lines below add the control the columns on the bom table
    // References
    td = document.createElement("TD");
    td.innerHTML = highlightFilter(references.join(", "));
    tr.appendChild(td);
    // Value
    td = document.createElement("TD");
    td.innerHTML = highlightFilter(bomentry[1]);
    tr.appendChild(td);
    // Footprint
    td = document.createElement("TD");
    td.innerHTML = highlightFilter(bomentry[2]);
    tr.appendChild(td);



    bom.appendChild(tr);
    var handler = createRowHighlightHandler(tr.id, references);
    tr.onmousemove = handler;
    globalData.pushHighlightHandlers({
      id: tr.id,
      handler: handler,
      refs: references
    });
    if ((filter || reflookup) && first) {
      handler();
      first = false;
    }
  }
}

function smoothScrollToRow(rowid) {
  document.getElementById(rowid).scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  });
}

function highlightPreviousRow() {
  if (!globalData.getCurrentHighlightedRowId()) {
    globalData.getHighlightHandlers()[globalData.getHighlightHandlers().length - 1].handler();
  } else {
    if (globalData.getHighlightHandlers().length > 1 &&
      globalData.getHighlightHandlers()[0].id == globalData.getCurrentHighlightedRowId()) {
      globalData.getHighlightHandlers()[globalData.getHighlightHandlers().length - 1].handler();
    } else {
      for (var i = 0; i < globalData.getHighlightHandlers().length - 1; i++) {
        if (globalData.getHighlightHandlers()[i + 1].id == globalData.getCurrentHighlightedRowId()) {
          globalData.getHighlightHandlers()[i].handler();
          break;
        }
      }
    }
  }
  smoothScrollToRow(globalData.getCurrentHighlightedRowId());
}

function highlightNextRow() {
  if (!globalData.getCurrentHighlightedRowId()) {
    globalData.getHighlightHandlers()[0].handler();
  } else {
    if (globalData.getHighlightHandlers().length > 1 &&
      globalData.getHighlightHandlers()[globalData.getHighlightHandlers().length - 1].id == globalData.getCurrentHighlightedRowId()) {
      globalData.getHighlightHandlers()[0].handler();
    } else {
      for (var i = 1; i < globalData.getHighlightHandlers().length; i++) {
        if (globalData.getHighlightHandlers()[i - 1].id == globalData.getCurrentHighlightedRowId()) {
          globalData.getHighlightHandlers()[i].handler();
          break;
        }
      }
    }
  }
  smoothScrollToRow(globalData.getCurrentHighlightedRowId());
}

function populateBomTable() {
  populateBomHeader();
  populateBomBody();
}

function modulesClicked(references) {
  var lastClickedIndex = references.indexOf(globalData.getLastClickedRef());
  var ref = references[(lastClickedIndex + 1) % references.length];
  for (var handler of globalData.getHighlightHandlers()) {
    if (handler.refs.indexOf(ref) >= 0) {
      globalData.setLastClickedRef(ref);
      handler.handler();
      smoothScrollToRow(globalData.getCurrentHighlightedRowId());
      break;
    }
  }
}

function updateFilter(input) {
  filter = input.toLowerCase();
  populateBomTable();
}

function updateRefLookup(input) {
  reflookup = input.toLowerCase();
  populateBomTable();
}

function silkscreenVisible(visible) {
  if (visible) {
    allcanvas.front.silk.style.display = "";
    allcanvas.back.silk.style.display = "";
    globalData.writeStorage("silkscreenVisible", true);
  } else {
    allcanvas.front.silk.style.display = "none";
    allcanvas.back.silk.style.display = "none";
    globalData.writeStorage("silkscreenVisible", false);
  }
}

function changeCanvasLayout(layout) {
  document.getElementById("fl-btn").classList.remove("depressed");
  document.getElementById("fb-btn").classList.remove("depressed");
  document.getElementById("bl-btn").classList.remove("depressed");
  switch (layout) {
    case 'F':
      document.getElementById("fl-btn").classList.add("depressed");
      if (globalData.getBomLayout() != "BOM") {
        globalData.collapseCanvasSplit(1);
      }
      break;
    case 'B':
      document.getElementById("bl-btn").classList.add("depressed");
      if (globalData.getBomLayout() != "BOM") {
        globalData.collapseCanvasSplit(0);
      }
      break;
    default:
      document.getElementById("fb-btn").classList.add("depressed");
      if (globalData.getBomLayout() != "BOM") {
        globalData.setSizesCanvasSplit([50, 50]);
      }
  }
  globalData.setCanvasLayout(layout);
  globalData.writeStorage("canvaslayout", layout);
  render.resizeAll();
  populateBomTable();
}

function populateMetadata() {
  document.getElementById("title").innerHTML    = pcbdata.metadata.title;
  document.getElementById("revision").innerHTML = "Rev: " + pcbdata.metadata.revision;
  document.getElementById("company").innerHTML  = pcbdata.metadata.company;
  document.getElementById("filedate").innerHTML = pcbdata.metadata.date;
  if (pcbdata.metadata.title != "") {
    document.title = pcbdata.metadata.title + " BOM";
  }
}

function changeBomLayout(layout) {
  document.getElementById("bom-btn").classList.remove("depressed");
  document.getElementById("lr-btn").classList.remove("depressed");
  document.getElementById("tb-btn").classList.remove("depressed");
  switch (layout) {
    case 'BOM':
      document.getElementById("bom-btn").classList.add("depressed");
      if (globalData.getBomSplit()) {
        globalData.destroyBomSplit();
        globalData.setBomSplit(null);
        globalData.destroyCanvasSplit();
        globalData.setCanvasSplit(null);
      }
      document.getElementById("frontcanvas").style.display = "none";
      document.getElementById("backcanvas").style.display = "none";
      document.getElementById("bot").style.height = "";
      break;
    case 'TB':
      document.getElementById("tb-btn").classList.add("depressed");
      document.getElementById("frontcanvas").style.display = "";
      document.getElementById("backcanvas").style.display = "";
      document.getElementById("bot").style.height = "calc(100% - 80px)";
      document.getElementById("bomdiv").classList.remove("split-horizontal");
      document.getElementById("canvasdiv").classList.remove("split-horizontal");
      document.getElementById("frontcanvas").classList.add("split-horizontal");
      document.getElementById("backcanvas").classList.add("split-horizontal");
      if (globalData.getBomSplit()) {
        globalData.destroyBomSplit();
        globalData.setBomSplit(null);
        globalData.destroyCanvasSplit();
        globalData.setCanvasSplit(null);
      }
      globalData.setBomSplit(Split(['#bomdiv', '#canvasdiv'], {
        sizes: [50, 50],
        onDragEnd: render.resizeAll,
        direction: "vertical",
        gutterSize: 5
      }));
      globalData.setCanvasSplit(Split(['#frontcanvas', '#backcanvas'], {
        sizes: [50, 50],
        gutterSize: 5,
        onDragEnd: render.resizeAll
      }));
      break;
    case 'LR':
      document.getElementById("lr-btn").classList.add("depressed");
      document.getElementById("frontcanvas").style.display = "";
      document.getElementById("backcanvas").style.display = "";
      document.getElementById("bot").style.height = "calc(100% - 80px)";
      document.getElementById("bomdiv").classList.add("split-horizontal");
      document.getElementById("canvasdiv").classList.add("split-horizontal");
      document.getElementById("frontcanvas").classList.remove("split-horizontal");
      document.getElementById("backcanvas").classList.remove("split-horizontal");
      if (globalData.getBomSplit()) {
        globalData.destroyBomSplit();
        globalData.setBomSplit(null);
        globalData.destroyCanvasSplit();
        globalData.setCanvasSplit(null);
      }
      globalData.setBomSplit(Split(['#bomdiv', '#canvasdiv'], {
        sizes: [50, 50],
        onDragEnd: render.resizeAll,
        gutterSize: 5
      }));
      globalData.setCanvasSplit(Split(['#frontcanvas', '#backcanvas'], {
        sizes: [50, 50],
        gutterSize: 5,
        direction: "vertical",
        onDragEnd: render.resizeAll
      }));
  }
  globalData.setBomLayout(layout);
  globalData.writeStorage("bomlayout", layout);
  changeCanvasLayout(globalData.getCanvasLayout());
}

function focusInputField(input) {
  input.scrollIntoView(false);
  input.focus();
  input.select();
}

function focusFilterField() {
  focusInputField(document.getElementById("filter"));
}

function focusRefLookupField() {
  focusInputField(document.getElementById("reflookup"));
}

function toggleBomCheckbox(bomrowid, checkboxnum) {
  if (!bomrowid || checkboxnum > globalData.getCheckboxes().length) {
    return;
  }
  var bomrow = document.getElementById(bomrowid);
  var checkbox = bomrow.childNodes[checkboxnum].childNodes[0];
  checkbox.checked = !checkbox.checked;
  checkbox.indeterminate = false;
  checkbox.onchange();
}

function checkBomCheckbox(bomrowid, checkboxname) {
  var checkboxnum = 0;
  while (checkboxnum < globalData.getCheckboxes().length &&
    globalData.getCheckboxes()[checkboxnum].toLowerCase() != checkboxname.toLowerCase()) {
    checkboxnum++;
  }
  if (!bomrowid || checkboxnum >= globalData.getCheckboxes().length) {
    return;
  }
  var bomrow = document.getElementById(bomrowid);
  var checkbox = bomrow.childNodes[checkboxnum + 1].childNodes[0];
  checkbox.checked = true;
  checkbox.indeterminate = false;
  checkbox.onchange();
}


function removeGutterNode(node) {
  for (var i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].classList &&
      node.childNodes[i].classList.contains("gutter")) {
      node.removeChild(node.childNodes[i]);
      break;
    }
  }
}

function cleanGutters() {
  removeGutterNode(document.getElementById("bot"));
  removeGutterNode(document.getElementById("canvasdiv"));
}

function setBomCheckboxes(value) {
  globalData.setBomCheckboxes(value);
  globalData.writeStorage("bomCheckboxes", value);
  populateBomTable();
}

document.onkeydown = function(e) {
  switch (e.key) {
    case "n":
      if (document.activeElement.type == "text") {
        return;
      }
      if (globalData.getCurrentHighlightedRowId() !== null) {
        checkBomCheckbox(globalData.getCurrentHighlightedRowId(), "placed");
        highlightNextRow();
        e.preventDefault();
      }
      break;
    case "ArrowUp":
      highlightPreviousRow();
      e.preventDefault();
      break;
    case "ArrowDown":
      highlightNextRow();
      e.preventDefault();
      break;
    default:
      break;
  }
  if (e.altKey) {
    switch (e.key) {
      case "f":
        focusFilterField();
        e.preventDefault();
        break;
      case "r":
        focusRefLookupField();
        e.preventDefault();
        break;
      case "z":
        changeBomLayout("BOM");
        e.preventDefault();
        break;
      case "x":
        changeBomLayout("LR");
        e.preventDefault();
        break;
      case "c":
        changeBomLayout("TB");
        e.preventDefault();
        break;
      case "v":
        changeCanvasLayout("F");
        e.preventDefault();
        break;
      case "b":
        changeCanvasLayout("FB");
        e.preventDefault();
        break;
      case "n":
        changeCanvasLayout("B");
        e.preventDefault();
        break;
      default:
        break;
    }
    if (e.key >= '1' && e.key <= '9') {
      toggleBomCheckbox(currentHighlightedRowId, parseInt(e.key));
    }
  }
}

window.onload = function(e) {
  globalData.initStorage();
  cleanGutters();
  render.initRender();
  dbgdiv = document.getElementById("dbg");
  bom = document.getElementById("bombody");
  bomhead = document.getElementById("bomhead");
  globalData.setBomLayout(globalData.readStorage("bomlayout"));
  if (!globalData.getBomLayout()) {
    globalData.setBomLayout("LR");
  }
  globalData.setCanvasLayout(globalData.readStorage("canvaslayout"));
  if (!globalData.getCanvasLayout()) {
    globalData.setCanvasLayout("FB");
  }
  filter = "";
  reflookup = "";
  populateMetadata();
  globalData.setBomCheckboxes(globalData.readStorage("bomCheckboxes"));
  if (globalData.getBomCheckboxes() === null) {
    globalData.setBomCheckboxes("Sourced,Placed");
  }
  document.getElementById("bomCheckboxes").value = globalData.getBomCheckboxes();
  if (globalData.readStorage("silkscreenVisible") === "false") {
    document.getElementById("silkscreenCheckbox").checked = false;
    silkscreenVisible(false);
  }
  if (globalData.readStorage("redrawOnDrag") === "false") {
    document.getElementById("dragCheckbox").checked = false;
    globalData.setRedrawOnDrag(false);
  }
  if (globalData.readStorage("darkmode") === "true") {
    document.getElementById("darkmodeCheckbox").checked = true;
    setDarkMode(true);
  }
  if (globalData.readStorage("highlightpin1") === "true") {
    document.getElementById("highlightpin1Checkbox").checked = true;
    globalData.setHighlightPin1(true);
    render.redrawCanvas(allcanvas.front);
    render.redrawCanvas(allcanvas.back);
  }
  boardRotation = globalData.readStorage("boardRotation");
  if (boardRotation === null) {
    boardRotation = 0;
  } else {
    boardRotation = parseInt(boardRotation);
  }
  document.getElementById("boardRotation").value = boardRotation / 5;
  document.getElementById("rotationDegree").textContent = boardRotation;
  // Triggers render
  changeBomLayout(globalData.getBomLayout());
}

window.onresize = render.resizeAll;
window.matchMedia("print").addListener(render.resizeAll);

module.exports = {
  setDarkMode, silkscreenVisible, updateFilter, updateRefLookup, changeBomLayout, changeCanvasLayout, setBomCheckboxes
}
},{"../vender/split.js":5,"./global.js":1,"./render.js":4}],4:[function(require,module,exports){
/* PCB rendering code */

var globalData = require('./global.js')

function deg2rad(deg) {
  return deg * Math.PI / 180;
}

function calcFontPoint(linepoint, text, offsetx, offsety, tilt) {
  var point = [
    linepoint[0] * text.width + offsetx,
    linepoint[1] * text.height + offsety
  ];
  // Adding half a line height here is technically a bug
  // but pcbnew currently does the same, text is slightly shifted.
  point[0] -= (point[1] + text.height * 0.5) * tilt;
  return point;
}

function drawtext(ctx, text, color, flip) {
  ctx.save();
  ctx.translate(...text.pos);
  var angle = -text.angle;
  if (text.attr.includes("mirrored")) {
    ctx.scale(-1, 1);
    angle = -angle;
  }
  var tilt = 0;
  if (text.attr.includes("italic")) {
    tilt = 0.125;
  }
  var interline = (text.height * 1.5 + text.thickness) / 2;
  var txt = text.text.split("\n");
  ctx.rotate(deg2rad(angle));
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineWidth = text.thickness;
  for (var i in txt) {
    var offsety = (-(txt.length - 1) + i * 2) * interline + text.height / 2;
    var lineWidth = 0;
    for (var c of txt[i]) {
      lineWidth += pcbdata.font_data[c].w * text.width;
    }
    var offsetx = 0;
    switch (text.horiz_justify) {
      case -1:
        // Justify left, do nothing
        break;
      case 0:
        // Justify center
        offsetx -= lineWidth / 2;
        break;
      case 1:
        // Justify right
        offsetx -= lineWidth;
        break;
    }
    for (var c of txt[i]) {
      for (var line of pcbdata.font_data[c].l) {
        // Drawing each segment separately instead of
        // polyline because round line caps don't work in joints
        for (var i = 0; i < line.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(...calcFontPoint(line[i], text, offsetx, offsety, tilt));
          ctx.lineTo(...calcFontPoint(line[i + 1], text, offsetx, offsety, tilt));
          ctx.stroke();
        }
      }
      offsetx += pcbdata.font_data[c].w * text.width;
    }
  }
  ctx.restore();
}

function drawedge(ctx, scalefactor, edge, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1 / scalefactor, edge.width);
  ctx.lineCap = "round";
  if (edge.type == "segment") 
  {
    ctx.beginPath();
    ctx.moveTo(...edge.start);
    ctx.lineTo(...edge.end);
    ctx.stroke();
  }
  if (edge.type == "arc") {
    ctx.beginPath();
    ctx.arc(
      ...edge.start,
      edge.radius,
      deg2rad(edge.startangle),
      deg2rad(edge.endangle));
    ctx.stroke();
  }
  if (edge.type == "circle") {
    ctx.beginPath();
    ctx.arc(
      ...edge.start,
      edge.radius,
      0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}

function drawRoundRect(ctx, color, size, radius, ctxmethod) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  var x = size[0] * -0.5;
  var y = size[1] * -0.5;
  var width = size[0];
  var height = size[1];
  ctx.moveTo(x, 0);
  ctx.arcTo(x, y + height, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y, radius);
  ctx.arcTo(x + width, y, x, y, radius);
  ctx.arcTo(x, y, x, y + height, radius);
  ctx.closePath();
  ctxmethod();
}

function drawOblong(ctx, color, size, ctxmethod) {
  drawRoundRect(ctx, color, size, Math.min(size[0], size[1]) / 2, ctxmethod);
}

function drawPolygons(ctx, color, polygons, ctxmethod) {
  ctx.fillStyle = color;
  if(polygons.length>0)
  {
    for (var polygon of polygons) {
      ctx.beginPath();
      for (var vertex of polygon) {
        ctx.lineTo(...vertex)
      }
      ctx.closePath();
      ctxmethod();
    }
  }
}

function drawPolygonShape(ctx, shape, color) {
  ctx.save();
  ctx.translate(...shape.pos);
  ctx.rotate(deg2rad(-shape.angle));
  drawPolygons(ctx, color, shape.polygons, ctx.fill.bind(ctx));
  ctx.restore();
}

function drawDrawing(ctx, layer, scalefactor, drawing, color) {
  if (["segment", "arc", "circle"].includes(drawing.type)) {
    drawedge(ctx, scalefactor, drawing, color);
  } else if (drawing.type == "polygon") {
    drawPolygonShape(ctx, drawing, color);
  } else {
    drawtext(ctx, drawing, color, layer == "B");
  }
}

function drawCircle(ctx, radius, ctxmethod) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctxmethod();
}

function drawPad(ctx, pad, color, outline) {
  ctx.save();
  ctx.translate(...pad.pos);
  ctx.rotate(deg2rad(pad.angle));
  if (pad.offset) {
    ctx.translate(...pad.offset);
  }
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  var ctxmethod = outline ? ctx.stroke.bind(ctx) : ctx.fill.bind(ctx);
  if (pad.shape == "rect") {
    var rect = [...pad.size.map(c => -c * 0.5), ...pad.size];
    if (outline) {
      ctx.strokeRect(...rect);
    } else {
      ctx.fillRect(...rect);
    }
  } else if (pad.shape == "oval") {
    drawOblong(ctx, color, pad.size, ctxmethod);
  } else if (pad.shape == "circle") {
    drawCircle(ctx, pad.size[0] / 2, ctxmethod);
  } else if (pad.shape == "roundrect") {
    drawRoundRect(ctx, color, pad.size, pad.radius, ctxmethod);
  } else if (pad.shape == "custom") {
    drawPolygons(ctx, color, pad.polygons, ctxmethod);
  }
  if (pad.type == "th" && !outline) {
    ctx.fillStyle = "#CCCCCC";
    if (pad.drillshape == "oblong") {
      drawOblong(ctx, "#CCCCCC", pad.drillsize, ctxmethod);
    } else {
      drawCircle(ctx, pad.drillsize[0] / 2, ctxmethod);
    }
  }
  ctx.restore();
}

function drawModule(ctx, layer, scalefactor, module, padcolor, outlinecolor, highlight) {
  if (highlight) {
    // draw bounding box
    if (module.layer == layer) {
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.translate(...module.bbox.pos);
      ctx.fillStyle = padcolor;
      ctx.fillRect(
        0, 0,
        ...module.bbox.size);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = padcolor;
      ctx.strokeRect(
        0, 0,
        ...module.bbox.size);
      ctx.restore();
    }
  }
  // draw drawings
  for (var drawing of module.drawings) {
    if (drawing.layer == layer) {
      drawDrawing(ctx, layer, scalefactor, drawing.drawing, padcolor);
    }
  }
  // draw pads
  for (var pad of module.pads) {
    if (pad.layers.includes(layer)) {
      drawPad(ctx, pad, padcolor, false);
      
      
      if (pad.pin1 && globalData.getHighlightPin1()) 
      {
        drawPad(ctx, pad, outlinecolor, true);
      }
    }
  }
}

function drawEdges(canvas, scalefactor) {
  var ctx = canvas.getContext("2d");
  var edgecolor = getComputedStyle(topmostdiv).getPropertyValue('--pcb-edge-color');
  for (var edge of pcbdata.edges) {
    drawedge(ctx, scalefactor, edge, edgecolor);
  }
}

function drawModules(canvas, layer, scalefactor, highlightedRefs) {
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 3 / scalefactor;
  var style = getComputedStyle(topmostdiv);
  var padcolor = style.getPropertyValue('--pad-color');
  var outlinecolor = style.getPropertyValue('--pin1-outline-color');
  if (highlightedRefs.length > 0) {
    padcolor = style.getPropertyValue('--pad-color-highlight');
    outlinecolor = style.getPropertyValue('--pin1-outline-color-highlight');
  }
  for (var i in pcbdata.modules) {
    var mod = pcbdata.modules[i];
    var highlight = highlightedRefs.includes(mod.ref);
    if (highlightedRefs.length == 0 || highlight) {
      drawModule(ctx, layer, scalefactor, mod, padcolor, outlinecolor, highlight);
    }
  }
}

function drawSilkscreen(canvas, layer, scalefactor)
{
  var ctx = canvas.getContext("2d");
  for (var d of pcbdata.silkscreen[layer])
  {
    if (["segment", "arc", "circle"].includes(d.type))
    {
      drawedge(ctx, scalefactor, d, "#aa4");
    }
    else if (d.type == "polygon")
    {
      drawPolygonShape(ctx, d, "#4aa");
    }
    else
    {
      drawtext(ctx, d, "#4aa", layer == "B");
    }
  }
}

function clearCanvas(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawHighlightsOnLayer(canvasdict) {
  clearCanvas(canvasdict.highlight);
  drawModules(canvasdict.highlight, canvasdict.layer,
    canvasdict.transform.s, globalData.getHighlightedRefs());
}

function drawHighlights() {
  drawHighlightsOnLayer(allcanvas.front);
  drawHighlightsOnLayer(allcanvas.back);
}

function drawBackground(canvasdict) {
  clearCanvas(canvasdict.bg);
  clearCanvas(canvasdict.silk);
  drawEdges(canvasdict.bg, canvasdict.transform.s);
  drawModules(canvasdict.bg, canvasdict.layer, canvasdict.transform.s, []);
  drawSilkscreen(canvasdict.silk, canvasdict.layer, canvasdict.transform.s);
}

function prepareCanvas(canvas, flip, transform) {
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  var fontsize = 1.55;
  ctx.scale(transform.zoom, transform.zoom);
  ctx.translate(transform.panx, transform.pany);
  if (flip) {
    ctx.scale(-1, 1);
  }
  ctx.translate(transform.x, transform.y);
  ctx.rotate(deg2rad(boardRotation));
  ctx.scale(transform.s, transform.s);
}

function prepareLayer(canvasdict) {
  var flip = (canvasdict.layer != "B");
  for (var c of ["bg", "silk", "highlight"]) {
    prepareCanvas(canvasdict[c], flip, canvasdict.transform);
  }
}

function rotateVector(v, angle) {
  angle = deg2rad(angle);
  return [
    v[0] * Math.cos(angle) - v[1] * Math.sin(angle),
    v[0] * Math.sin(angle) + v[1] * Math.cos(angle)
  ];
}

function applyRotation(bbox) {
  var corners = [
    [bbox.minx, bbox.miny],
    [bbox.minx, bbox.maxy],
    [bbox.maxx, bbox.miny],
    [bbox.maxx, bbox.maxy],
  ];
  corners = corners.map((v) => rotateVector(v, boardRotation));
  return {
    minx: corners.reduce((a, v) => Math.min(a, v[0]), Infinity),
    miny: corners.reduce((a, v) => Math.min(a, v[1]), Infinity),
    maxx: corners.reduce((a, v) => Math.max(a, v[0]), -Infinity),
    maxy: corners.reduce((a, v) => Math.max(a, v[1]), -Infinity),
  }
}

function recalcLayerScale(canvasdict) {
  var canvasdivid = {
    "F": "frontcanvas",
    "B": "backcanvas"
  } [canvasdict.layer];
  var width = document.getElementById(canvasdivid).clientWidth * 2;
  var height = document.getElementById(canvasdivid).clientHeight * 2;
  var bbox = applyRotation(pcbdata.edges_bbox);
  var scalefactor = 0.98 * Math.min(
    width / (bbox.maxx - bbox.minx),
    height / (bbox.maxy - bbox.miny)
  );
  if (scalefactor < 0.1) {
    scalefactor = 1;
  }
  canvasdict.transform.s = scalefactor;
  var flip = (canvasdict.layer != "B");
  if (flip) {
    canvasdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor + width) * 0.5;
  } else {
    canvasdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor - width) * 0.5;
  }
  canvasdict.transform.y = -((bbox.maxy + bbox.miny) * scalefactor - height) * 0.5;
  for (var c of ["bg", "silk", "highlight"]) {
    canvas = canvasdict[c];
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = (width / 2) + "px";
    canvas.style.height = (height / 2) + "px";
  }
  console.log("Scale factor " + canvasdivid + ": ", canvasdict.transform);
}

function redrawCanvas(layerdict) {
  prepareLayer(layerdict);
  drawBackground(layerdict);
  drawHighlightsOnLayer(layerdict);
}

function resizeCanvas(layerdict) {
  recalcLayerScale(layerdict);
  redrawCanvas(layerdict);
}

function resizeAll() {
  resizeCanvas(allcanvas.front);
  resizeCanvas(allcanvas.back);
}

function bboxScan(layer, x, y) {
  var result = [];
  for (var i in pcbdata.modules) {
    var module = pcbdata.modules[i];
    if (module.layer == layer) {
      var b = module.bbox;
      if (b.pos[0] <= x && b.pos[0] + b.size[0] >= x &&
        b.pos[1] <= y && b.pos[1] + b.size[1] >= y) {
        result.push(module.ref);
      }
    }
  }
  return result;
}

function handleMouseDown(e, layerdict) {
  if (e.which != 1) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  layerdict.transform.mousestartx = e.offsetX;
  layerdict.transform.mousestarty = e.offsetY;
  layerdict.transform.mousedownx = e.offsetX;
  layerdict.transform.mousedowny = e.offsetY;
  layerdict.transform.mousedown = true;
}

function handleMouseClick(e, layerdict) {
  var x = e.offsetX;
  var y = e.offsetY;
  var t = layerdict.transform;
  if (layerdict.layer == "B") {
    x = (2 * x / t.zoom - t.panx + t.x) / -t.s;
  } else {
    x = (2 * x / t.zoom - t.panx - t.x) / t.s;
  }
  y = (2 * y / t.zoom - t.y - t.pany) / t.s;
  var v = rotateVector([x, y], -boardRotation);
  var reflist = bboxScan(layerdict.layer, v[0], v[1]);
  if (reflist.length > 0) {
    modulesClicked(reflist);
    drawHighlights();
  }
}

function handleMouseUp(e, layerdict) {
  e.preventDefault();
  e.stopPropagation();
  if (e.which == 1 &&
    layerdict.transform.mousedown &&
    layerdict.transform.mousedownx == e.offsetX &&
    layerdict.transform.mousedowny == e.offsetY) {
    // This is just a click
    handleMouseClick(e, layerdict);
    layerdict.transform.mousedown = false;
    return;
  }
  if (e.which == 3) {
    // Reset pan and zoom on right click.
    layerdict.transform.panx = 0;
    layerdict.transform.pany = 0;
    layerdict.transform.zoom = 1;
    redrawCanvas(layerdict);
  } else if (!globalData.getRedrawOnDrag()) {
    redrawCanvas(layerdict);
  }
  layerdict.transform.mousedown = false;
}

function handleMouseMove(e, layerdict) {
  if (!layerdict.transform.mousedown) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  var dx = e.offsetX - layerdict.transform.mousestartx;
  var dy = e.offsetY - layerdict.transform.mousestarty;
  layerdict.transform.panx += 2 * dx / layerdict.transform.zoom;
  layerdict.transform.pany += 2 * dy / layerdict.transform.zoom;
  layerdict.transform.mousestartx = e.offsetX;
  layerdict.transform.mousestarty = e.offsetY;
  if (globalData.getRedrawOnDrag()) {
    redrawCanvas(layerdict);
  }
}

function handleMouseWheel(e, layerdict) {
  e.preventDefault();
  e.stopPropagation();
  var t = layerdict.transform;
  var wheeldelta = e.deltaY;
  if (e.deltaMode == 1) {
    // FF only, scroll by lines
    wheeldelta *= 30;
  } else if (e.deltaMode == 2) {
    wheeldelta *= 300;
  }
  var m = Math.pow(1.1, -wheeldelta / 40);
  // Limit amount of zoom per tick.
  if (m > 2) {
    m = 2;
  } else if (m < 0.5) {
    m = 0.5;
  }
  t.zoom *= m;
  var zoomd = (1 - m) / t.zoom;
  t.panx += 2 * e.offsetX * zoomd;
  t.pany += 2 * e.offsetY * zoomd;
  redrawCanvas(layerdict);
  console.log(layerdict.transform.zoom);
}

function addMouseHandlers(div, layerdict) {
  div.onmousedown = function(e) {
    handleMouseDown(e, layerdict);
  };
  div.onmousemove = function(e) {
    handleMouseMove(e, layerdict);
  };
  div.onmouseup = function(e) {
    handleMouseUp(e, layerdict);
  };
  div.onmouseout = function(e) {
    handleMouseUp(e, layerdict);
  }
  div.onwheel = function(e) {
    handleMouseWheel(e, layerdict);
  }
  for (var element of [div, layerdict.bg, layerdict.silk, layerdict.highlight]) {
    element.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    }, false);
  }
}

function setBoardRotation(value) {
  boardRotation = value * 5;
  globalData.writeStorage("boardRotation", boardRotation);
  document.getElementById("rotationDegree").textContent = boardRotation;
  resizeAll();
}

function initRender() {
  allcanvas = {
    front: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
        mousestartx: 0,
        mousestarty: 0,
        mousedown: false,
      },
      bg: document.getElementById("F_bg"),
      silk: document.getElementById("F_slk"),
      highlight: document.getElementById("F_hl"),
      layer: "F",
    },
    back: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
        mousestartx: 0,
        mousestarty: 0,
        mousedown: false,
      },
      bg: document.getElementById("B_bg"),
      silk: document.getElementById("B_slk"),
      highlight: document.getElementById("B_hl"),
      layer: "B",
    }
  };
  addMouseHandlers(document.getElementById("frontcanvas"), allcanvas.front);
  addMouseHandlers(document.getElementById("backcanvas"), allcanvas.back);
}

module.exports = {
  resizeAll,
  initRender,
  redrawCanvas,
  drawHighlights,
  setBoardRotation
};
},{"./global.js":1}],5:[function(require,module,exports){
/*
  Split.js - v1.3.5
  MIT License
  https://github.com/nathancahill/Split.js
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Split=t()}(this,function(){"use strict";var e=window,t=e.document,n="addEventListener",i="removeEventListener",r="getBoundingClientRect",s=function(){return!1},o=e.attachEvent&&!e[n],a=["","-webkit-","-moz-","-o-"].filter(function(e){var n=t.createElement("div");return n.style.cssText="width:"+e+"calc(9px)",!!n.style.length}).shift()+"calc",l=function(e){return"string"==typeof e||e instanceof String?t.querySelector(e):e};return function(u,c){function z(e,t,n){var i=A(y,t,n);Object.keys(i).forEach(function(t){return e.style[t]=i[t]})}function h(e,t){var n=B(y,t);Object.keys(n).forEach(function(t){return e.style[t]=n[t]})}function f(e){var t=E[this.a],n=E[this.b],i=t.size+n.size;t.size=e/this.size*i,n.size=i-e/this.size*i,z(t.element,t.size,this.aGutterSize),z(n.element,n.size,this.bGutterSize)}function m(e){var t;this.dragging&&((t="touches"in e?e.touches[0][b]-this.start:e[b]-this.start)<=E[this.a].minSize+M+this.aGutterSize?t=E[this.a].minSize+this.aGutterSize:t>=this.size-(E[this.b].minSize+M+this.bGutterSize)&&(t=this.size-(E[this.b].minSize+this.bGutterSize)),f.call(this,t),c.onDrag&&c.onDrag())}function g(){var e=E[this.a].element,t=E[this.b].element;this.size=e[r]()[y]+t[r]()[y]+this.aGutterSize+this.bGutterSize,this.start=e[r]()[G]}function d(){var t=this,n=E[t.a].element,r=E[t.b].element;t.dragging&&c.onDragEnd&&c.onDragEnd(),t.dragging=!1,e[i]("mouseup",t.stop),e[i]("touchend",t.stop),e[i]("touchcancel",t.stop),t.parent[i]("mousemove",t.move),t.parent[i]("touchmove",t.move),delete t.stop,delete t.move,n[i]("selectstart",s),n[i]("dragstart",s),r[i]("selectstart",s),r[i]("dragstart",s),n.style.userSelect="",n.style.webkitUserSelect="",n.style.MozUserSelect="",n.style.pointerEvents="",r.style.userSelect="",r.style.webkitUserSelect="",r.style.MozUserSelect="",r.style.pointerEvents="",t.gutter.style.cursor="",t.parent.style.cursor=""}function S(t){var i=this,r=E[i.a].element,o=E[i.b].element;!i.dragging&&c.onDragStart&&c.onDragStart(),t.preventDefault(),i.dragging=!0,i.move=m.bind(i),i.stop=d.bind(i),e[n]("mouseup",i.stop),e[n]("touchend",i.stop),e[n]("touchcancel",i.stop),i.parent[n]("mousemove",i.move),i.parent[n]("touchmove",i.move),r[n]("selectstart",s),r[n]("dragstart",s),o[n]("selectstart",s),o[n]("dragstart",s),r.style.userSelect="none",r.style.webkitUserSelect="none",r.style.MozUserSelect="none",r.style.pointerEvents="none",o.style.userSelect="none",o.style.webkitUserSelect="none",o.style.MozUserSelect="none",o.style.pointerEvents="none",i.gutter.style.cursor=j,i.parent.style.cursor=j,g.call(i)}function v(e){e.forEach(function(t,n){if(n>0){var i=F[n-1],r=E[i.a],s=E[i.b];r.size=e[n-1],s.size=t,z(r.element,r.size,i.aGutterSize),z(s.element,s.size,i.bGutterSize)}})}function p(){F.forEach(function(e){e.parent.removeChild(e.gutter),E[e.a].element.style[y]="",E[e.b].element.style[y]=""})}void 0===c&&(c={});var y,b,G,E,w=l(u[0]).parentNode,D=e.getComputedStyle(w).flexDirection,U=c.sizes||u.map(function(){return 100/u.length}),k=void 0!==c.minSize?c.minSize:100,x=Array.isArray(k)?k:u.map(function(){return k}),L=void 0!==c.gutterSize?c.gutterSize:10,M=void 0!==c.snapOffset?c.snapOffset:30,O=c.direction||"horizontal",j=c.cursor||("horizontal"===O?"ew-resize":"ns-resize"),C=c.gutter||function(e,n){var i=t.createElement("div");return i.className="gutter gutter-"+n,i},A=c.elementStyle||function(e,t,n){var i={};return"string"==typeof t||t instanceof String?i[e]=t:i[e]=o?t+"%":a+"("+t+"% - "+n+"px)",i},B=c.gutterStyle||function(e,t){return n={},n[e]=t+"px",n;var n};"horizontal"===O?(y="width","clientWidth",b="clientX",G="left","paddingLeft"):"vertical"===O&&(y="height","clientHeight",b="clientY",G="top","paddingTop");var F=[];return E=u.map(function(e,t){var i,s={element:l(e),size:U[t],minSize:x[t]};if(t>0&&(i={a:t-1,b:t,dragging:!1,isFirst:1===t,isLast:t===u.length-1,direction:O,parent:w},i.aGutterSize=L,i.bGutterSize=L,i.isFirst&&(i.aGutterSize=L/2),i.isLast&&(i.bGutterSize=L/2),"row-reverse"===D||"column-reverse"===D)){var a=i.a;i.a=i.b,i.b=a}if(!o&&t>0){var c=C(t,O);h(c,L),c[n]("mousedown",S.bind(i)),c[n]("touchstart",S.bind(i)),w.insertBefore(c,s.element),i.gutter=c}0===t||t===u.length-1?z(s.element,s.size,L/2):z(s.element,s.size,L);var f=s.element[r]()[y];return f<s.minSize&&(s.minSize=f),t>0&&F.push(i),s}),o?{setSizes:v,destroy:p}:{setSizes:v,getSizes:function(){return E.map(function(e){return e.size})},collapse:function(e){if(e===F.length){var t=F[e-1];g.call(t),o||f.call(t,t.size-t.bGutterSize)}else{var n=F[e];g.call(n),o||f.call(n,n.aGutterSize)}},destroy:p}}});

},{}]},{},[3,4,2,5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ2xvYmFsLmpzIiwic3JjL2h0bWxGdW5jdGlvbnMuanMiLCJzcmMvaWJvbS5qcyIsInNyYy9yZW5kZXIuanMiLCJ2ZW5kZXIvc3BsaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDanZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgQm9hcmQgUm90YXRpb24gICAgICAgICAgICAgICAgICAgIFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBzdG9yYWdlXG52YXIgc3RvcmFnZVByZWZpeCA9ICdLaUNhZF9IVE1MX0JPTV9fJyArIHBjYmRhdGEubWV0YWRhdGEudGl0bGUgKyAnX18nICsgcGNiZGF0YS5tZXRhZGF0YS5yZXZpc2lvbiArICdfXydcblxuZnVuY3Rpb24gaW5pdFN0b3JhZ2UgKGtleSkge1xuICB0cnkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImJsYW5rXCIpO1xuICAgIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coXCJTdG9yYWdlIGluaXQgZXJyb3JcIik7XG4gICAgLy8gbG9jYWxTdG9yYWdlIG5vdCBhdmFpbGFibGVcbiAgfVxuICBpZiAoIXN0b3JhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJibGFua1wiKTtcbiAgICAgIHN0b3JhZ2UgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2Vzc2lvblN0b3JhZ2UgYWxzbyBub3QgYXZhaWxhYmxlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlYWRTdG9yYWdlKGtleSkge1xuICBpZiAoc3RvcmFnZSkge1xuICAgIHJldHVybiBzdG9yYWdlLmdldEl0ZW0oc3RvcmFnZVByZWZpeCArICcjJyArIGtleSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JpdGVTdG9yYWdlKGtleSwgdmFsdWUpIHtcbiAgaWYgKHN0b3JhZ2UpIHtcbiAgICBzdG9yYWdlLnNldEl0ZW0oc3RvcmFnZVByZWZpeCArICcjJyArIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgIEhpZ2hsaWdodGVkIFJlZnMgICAgICAgICAgICAgICAgICAgIFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBoaWdobGlnaHRlZFJlZnMgPSBbXTtcblxuZnVuY3Rpb24gc2V0SGlnaGxpZ2h0ZWRSZWZzKHJlZnMpe1xuICAgIGhpZ2hsaWdodGVkUmVmcyA9IHJlZnM7XG59XG5cbmZ1bmN0aW9uIGdldEhpZ2hsaWdodGVkUmVmcygpe1xuICAgIHJldHVybiBoaWdobGlnaHRlZFJlZnM7XG59XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICBSZWRyYXcgT24gRHJhZyAgICAgICAgICAgICAgICAgICAgICBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgcmVkcmF3T25EcmFnID0gdHJ1ZTtcblxuICBcbmZ1bmN0aW9uIHNldFJlZHJhd09uRHJhZyh2YWx1ZSl7XG4gICAgcmVkcmF3T25EcmFnID0gdmFsdWU7XG4gICAgd3JpdGVTdG9yYWdlKFwicmVkcmF3T25EcmFnXCIsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVkcmF3T25EcmFnKCl7XG4gICAgcmV0dXJuIHJlZHJhd09uRHJhZztcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQk9NIFNwbGl0XG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGJvbXNwbGl0O1xuXG5mdW5jdGlvbiBzZXRCb21TcGxpdCh2YWx1ZSl7XG4gICAgYm9tc3BsaXQgPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Qm9tU3BsaXQoKXtcbiAgICByZXR1cm4gYm9tc3BsaXQ7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lCb21TcGxpdCgpe1xuICAgIGJvbXNwbGl0LmRlc3Ryb3koKVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ2FudmFzIFNwbGl0XG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGNhbnZhc3NwbGl0O1xuXG5mdW5jdGlvbiBzZXRDYW52YXNTcGxpdCh2YWx1ZSl7XG4gICAgY2FudmFzc3BsaXQgPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2FudmFzU3BsaXQoKXtcbiAgICByZXR1cm4gY2FudmFzc3BsaXQ7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lDYW52YXNTcGxpdCgpe1xuICAgIGNhbnZhc3NwbGl0LmRlc3Ryb3koKVxufVxuXG5mdW5jdGlvbiBjb2xsYXBzZUNhbnZhc1NwbGl0KHZhbHVlKVxue1xuICAgIGNhbnZhc3NwbGl0LmNvbGxhcHNlKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gc2V0U2l6ZXNDYW52YXNTcGxpdCh2YWx1ZSl7XG4gICAgY2FudmFzc3BsaXQuc2V0U2l6ZXMoWzUwLCA1MF0pO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ2FudmFzIExheW91dFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBjYW52YXNsYXlvdXQgPSBcIkZCXCI7XG5cbi8qWFhYIEZvdW5kIGEgYnVnIGF0IHN0YXJ0dXAuIENvZGUgYXNzdW1lcyB0aGF0IGNhbnZhcyBsYXlvdXQgXG5pcyBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzLiB0aGVuIHN5c3RlbSBmYWlscy4gaGUgYnVnIHdhcyB0aGF0IHRoZSBcbmNhbnZhc0xheW91dCB3YXMgYmVpbmcgc2V0IHRvICdkZWZhdWx0JyB3aGljaCBpcyBub3QgYSB2YWxpZCBzdGF0ZS4gXG5TbyBubyBpcyBjaGVjayB0aGF0IGlmIGRlZmF1bHQgaXMgc2VudCBpbiB0aGVuIHNldCB0aGUgbGF5b3V0IHRvIEZCIG1vZGUuXG4qL1xuLyogVE9ETzogTWFrZSB0aGUgZGVmYXVsdCBjaGVjayBiZWxvdyBhY3R1YWxseSBjaGVjayB0aGF0IHRoZSBpdGVtIFxuaXMgaW4gb25lIG9mIHRoZSB0aHJlZSB2YWxpZCBzdGF0ZXMuIElmIG5vdCB0aGVuIHNldCB0byBGQiwgb3RoZXJ3aXNlIHNldCB0byBvbmUgb2ZcbnRoZSB0aHJlZSB2YWxpZCBzdGF0ZXNcbiovXG5mdW5jdGlvbiBzZXRDYW52YXNMYXlvdXQodmFsdWUpe1xuICAgIGlmKHZhbHVlID09ICdkZWZhdWx0Jyl7XG4gICAgICAgIGNhbnZhc2xheW91dCA9ICdGQidcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNhbnZhc2xheW91dCA9IHZhbHVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2FudmFzTGF5b3V0KCl7XG4gICAgcmV0dXJuIGNhbnZhc2xheW91dDtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkJPTSBMYXlvdXRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgYm9tbGF5b3V0ID0gXCJkZWZhdWx0XCI7XG5cbmZ1bmN0aW9uIHNldEJvbUxheW91dCh2YWx1ZSl7XG4gICAgYm9tbGF5b3V0ID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEJvbUxheW91dCgpe1xuICAgIHJldHVybiBib21sYXlvdXQ7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5CT00gU29ydCBGdW5jdGlvblxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBib21Tb3J0RnVuY3Rpb24gPSBudWxsO1xuXG5mdW5jdGlvbiBzZXRCb21Tb3J0RnVuY3Rpb24odmFsdWUpe1xuICAgIGJvbVNvcnRGdW5jdGlvbiA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRCb21Tb3J0RnVuY3Rpb24oKXtcbiAgICByZXR1cm4gYm9tU29ydEZ1bmN0aW9uO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ3VycmVudCBTb3J0IENvbHVtblxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBjdXJyZW50U29ydENvbHVtbiA9IG51bGw7XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRTb3J0Q29sdW1uKHZhbHVlKXtcbiAgICBjdXJyZW50U29ydENvbHVtbiA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50U29ydENvbHVtbigpe1xuICAgIHJldHVybiBjdXJyZW50U29ydENvbHVtbjtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkN1cnJlbnQgU29ydCBPcmRlclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBjdXJyZW50U29ydE9yZGVyID0gbnVsbDtcblxuZnVuY3Rpb24gc2V0Q3VycmVudFNvcnRPcmRlcih2YWx1ZSl7XG4gICAgY3VycmVudFNvcnRPcmRlciA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50U29ydE9yZGVyKCl7XG4gICAgcmV0dXJuIGN1cnJlbnRTb3J0T3JkZXI7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5DdXJyZW50IEhpZ2hsaWdodGVkIFJvdyBJRFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBjdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZDtcblxuZnVuY3Rpb24gc2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQodmFsdWUpe1xuICAgIGN1cnJlbnRIaWdobGlnaHRlZFJvd0lkID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCl7XG4gICAgcmV0dXJuIGN1cnJlbnRIaWdobGlnaHRlZFJvd0lkO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuSGlnaGxpZ2h0IEhhbmRsZXJzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGhpZ2hsaWdodEhhbmRsZXJzID0gW107XG5cbmZ1bmN0aW9uIHNldEhpZ2hsaWdodEhhbmRsZXJzKHZhbHVlcyl7XG4gICAgaGlnaGxpZ2h0SGFuZGxlcnMgPSB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIGdldEhpZ2hsaWdodEhhbmRsZXJzKCl7XG4gICAgcmV0dXJuIGhpZ2hsaWdodEhhbmRsZXJzO1xufVxuXG5mdW5jdGlvbiBwdXNoSGlnaGxpZ2h0SGFuZGxlcnModmFsdWUpe1xuICAgIGhpZ2hsaWdodEhhbmRsZXJzLnB1c2godmFsdWUpO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ2hlY2tib3hlc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBjaGVja2JveGVzID0gW107XG5cbmZ1bmN0aW9uIHNldENoZWNrYm94ZXModmFsdWVzKXtcbiAgICBjaGVja2JveGVzID0gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBnZXRDaGVja2JveGVzKCl7XG4gICAgcmV0dXJuIGNoZWNrYm94ZXM7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5CT00gQ2hlY2tib3hlc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBib21DaGVja2JveGVzID0gXCJcIjtcblxuZnVuY3Rpb24gc2V0Qm9tQ2hlY2tib3hlcyh2YWx1ZXMpe1xuICAgIGJvbUNoZWNrYm94ZXMgPSB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIGdldEJvbUNoZWNrYm94ZXMoKXtcbiAgICByZXR1cm4gYm9tQ2hlY2tib3hlcztcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkhpZ2hsaWdodCBQaW4gMVxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBoaWdobGlnaHRwaW4xID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHNldEhpZ2hsaWdodFBpbjEodmFsdWUpIHtcbiAgd3JpdGVTdG9yYWdlKFwiaGlnaGxpZ2h0cGluMVwiLCB2YWx1ZSk7XG4gIGhpZ2hsaWdodHBpbjEgPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0SGlnaGxpZ2h0UGluMSgpe1xuICAgIHJldHVybiBoaWdobGlnaHRwaW4xO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuTGFzdCBDbGlja2VkIFJlZlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBsYXN0Q2xpY2tlZFJlZjtcblxuZnVuY3Rpb24gc2V0TGFzdENsaWNrZWRSZWYodmFsdWUpIHtcbiAgICBsYXN0Q2xpY2tlZFJlZiA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRMYXN0Q2xpY2tlZFJlZigpIHtcbiAgcmV0dXJuIGxhc3RDbGlja2VkUmVmO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdFN0b3JhZ2UgICAgICAgICAgICAgICAgLCByZWFkU3RvcmFnZSAgICAgICAgICAgICAgICAsIHdyaXRlU3RvcmFnZSAgICAgICAsXG4gIHNldEhpZ2hsaWdodGVkUmVmcyAgICAgICAgICwgZ2V0SGlnaGxpZ2h0ZWRSZWZzICAgICAgICAgLFxuICBzZXRSZWRyYXdPbkRyYWcgICAgICAgICAgICAsIGdldFJlZHJhd09uRHJhZyAgICAgICAgICAgICxcbiAgc2V0Qm9tU3BsaXQgICAgICAgICAgICAgICAgLCBnZXRCb21TcGxpdCAgICAgICAgICAgICAgICAsIGRlc3Ryb3lCb21TcGxpdCAgICAsXG4gIHNldENhbnZhc1NwbGl0ICAgICAgICAgICAgICwgZ2V0Q2FudmFzU3BsaXQgICAgICAgICAgICAgLCBkZXN0cm95Q2FudmFzU3BsaXQgLCBjb2xsYXBzZUNhbnZhc1NwbGl0ICwgc2V0U2l6ZXNDYW52YXNTcGxpdCxcbiAgc2V0Q2FudmFzTGF5b3V0ICAgICAgICAgICAgLCBnZXRDYW52YXNMYXlvdXQgICAgICAgICAgICAsXG4gIHNldEJvbUxheW91dCAgICAgICAgICAgICAgICwgZ2V0Qm9tTGF5b3V0ICAgICAgICAgICAgICAgLFxuICBzZXRCb21Tb3J0RnVuY3Rpb24gICAgICAgICAsIGdldEJvbVNvcnRGdW5jdGlvbiAgICAgICAgICxcbiAgc2V0Q3VycmVudFNvcnRDb2x1bW4gICAgICAgLCBnZXRDdXJyZW50U29ydENvbHVtbiAgICAgICAsXG4gIHNldEN1cnJlbnRTb3J0T3JkZXIgICAgICAgICwgZ2V0Q3VycmVudFNvcnRPcmRlciAgICAgICAgLFxuICBzZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCAsIGdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkICxcbiAgc2V0SGlnaGxpZ2h0SGFuZGxlcnMgICAgICAgLCBnZXRIaWdobGlnaHRIYW5kbGVycyAgICAgICAsIHB1c2hIaWdobGlnaHRIYW5kbGVycyAsXG4gIHNldENoZWNrYm94ZXMgICAgICAgICAgICAgICwgZ2V0Q2hlY2tib3hlcyAgICAgICAgICAgICAgLFxuICBzZXRCb21DaGVja2JveGVzICAgICAgICAgICAsIGdldEJvbUNoZWNrYm94ZXMgICAgICAgICAgICxcbiAgc2V0SGlnaGxpZ2h0UGluMSAgICAgICAgICAgLCBnZXRIaWdobGlnaHRQaW4xICAgICAgICAgICAsXG4gIHNldExhc3RDbGlja2VkUmVmICAgICAgICAgICwgZ2V0TGFzdENsaWNrZWRSZWYgICAgICAgICAgLFxufTsiLCJcbnZhciBnbG9iYWxEYXRhID0gcmVxdWlyZSgnLi9nbG9iYWwuanMnKVxudmFyIHJlbmRlciAgICAgPSByZXF1aXJlKCcuL3JlbmRlci5qcycpXG52YXIgaWJvbSAgICAgICA9IHJlcXVpcmUoJy4vaWJvbS5qcycpXG5cbmNvbnN0IGJvYXJkUm90YXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmRSb3RhdGlvbicpO1xuYm9hcmRSb3RhdGlvbi5vbmlucHV0PWZ1bmN0aW9uKClcbntcbiAgcmVuZGVyLnNldEJvYXJkUm90YXRpb24oYm9hcmRSb3RhdGlvbi52YWx1ZSk7XG59XG5cbmNvbnN0IGRhcmtNb2RlQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rhcmttb2RlQ2hlY2tib3gnKTtcbmRhcmtNb2RlQm94Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICBpYm9tLnNldERhcmtNb2RlKGRhcmtNb2RlQm94LmNoZWNrZWQpXG59XG5cbmNvbnN0IHNpbGtzY3JlZW5DaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWxrc2NyZWVuQ2hlY2tib3gnKTtcbnNpbGtzY3JlZW5DaGVja2JveC5jaGVja2VkPWZ1bmN0aW9uKCl7XG4gIGlib20uc2lsa3NjcmVlblZpc2libGUoc2lsa3NjcmVlbkNoZWNrYm94LmNoZWNrZWQpXG59XG5zaWxrc2NyZWVuQ2hlY2tib3gub25jaGFuZ2U9ZnVuY3Rpb24oKXtcbiAgaWJvbS5zaWxrc2NyZWVuVmlzaWJsZShzaWxrc2NyZWVuQ2hlY2tib3guY2hlY2tlZClcbn1cblxuY29uc3QgaGlnaGxpZ2h0cGluMUNoZWNrYm94ID1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlnaGxpZ2h0cGluMUNoZWNrYm94Jyk7XG5oaWdobGlnaHRwaW4xQ2hlY2tib3gub25jaGFuZ2U9ZnVuY3Rpb24oKXtcbiAgZ2xvYmFsRGF0YS5zZXRIaWdobGlnaHRQaW4xKGhpZ2hsaWdodHBpbjFDaGVja2JveC5jaGVja2VkKTtcbiAgcmVuZGVyLnJlZHJhd0NhbnZhcyhhbGxjYW52YXMuZnJvbnQpO1xuICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5iYWNrKTtcbn1cblxuY29uc3QgZHJhZ0NoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYWdDaGVja2JveCcpO1xuZHJhZ0NoZWNrYm94LmNoZWNrZWQ9ZnVuY3Rpb24oKXtcbiAgZ2xvYmFsRGF0YS5zZXRSZWRyYXdPbkRyYWcoZHJhZ0NoZWNrYm94LmNoZWNrZWQpXG59XG5kcmFnQ2hlY2tib3gub25jaGFuZ2U9ZnVuY3Rpb24oKXtcbiAgZ2xvYmFsRGF0YS5zZXRSZWRyYXdPbkRyYWcoZHJhZ0NoZWNrYm94LmNoZWNrZWQpXG59XG5cblxuY29uc3QgZmlsdGVyXzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyJyk7XG5maWx0ZXJfMi5vbmlucHV0PWZ1bmN0aW9uKCl7XG4gIGlib20udXBkYXRlRmlsdGVyKGZpbHRlcl8yLnZhbHVlKVxufVxuXG5cbmNvbnN0IHJlZmxvb2t1cF8yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZmxvb2t1cCcpO1xucmVmbG9va3VwXzIub25pbnB1dD1mdW5jdGlvbigpe1xuICBpYm9tLnVwZGF0ZVJlZkxvb2t1cChyZWZsb29rdXBfMi52YWx1ZSlcbn1cblxuY29uc3QgYm9tQ2hlY2tib3hlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib21DaGVja2JveGVzJyk7XG5ib21DaGVja2JveGVzLm9uaW5wdXQ9ZnVuY3Rpb24oKXtcbiAgaWJvbS5zZXRCb21DaGVja2JveGVzKGJvbUNoZWNrYm94ZXMudmFsdWUpO1xufVxuXG5jb25zdCBmbF9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmwtYnRuJyk7XG5mbF9idG4ub25jbGljaz1mdW5jdGlvbigpe1xuICBpYm9tLmNoYW5nZUNhbnZhc0xheW91dCgnRicpO1xufVxuXG5jb25zdCBmYl9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmItYnRuJyk7XG5mYl9idG4ub25jbGljaz1mdW5jdGlvbigpe1xuICBpYm9tLmNoYW5nZUNhbnZhc0xheW91dCgnRkInKTtcbn1cblxuXG5jb25zdCBibF9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmwtYnRuJyk7XG5ibF9idG4ub25jbGljaz1mdW5jdGlvbigpe1xuICBpYm9tLmNoYW5nZUNhbnZhc0xheW91dCgnQicpO1xufVxuXG5jb25zdCBib21fYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvbS1idG4nKTtcbmJvbV9idG4ub25jbGljaz1mdW5jdGlvbigpe1xuICBpYm9tLmNoYW5nZUJvbUxheW91dCgnQk9NJylcbn1cblxuY29uc3QgbHJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xyLWJ0bicpO1xubHJfYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcbiAgaWJvbS5jaGFuZ2VCb21MYXlvdXQoJ0xSJylcbn1cblxuY29uc3QgdGJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RiLWJ0bicpO1xudGJfYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcbiAgaWJvbS5jaGFuZ2VCb21MYXlvdXQoJ1RCJylcbn1cbiIsIi8qIERPTSBtYW5pcHVsYXRpb24gYW5kIG1pc2MgY29kZSAqL1xuXG5cbnZhciBTcGxpdCA9IHJlcXVpcmUoJy4uL3ZlbmRlci9zcGxpdC5qcycpXG52YXIgZ2xvYmFsRGF0YSA9IHJlcXVpcmUoJy4vZ2xvYmFsLmpzJylcbnZhciByZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlci5qcycpXG5cbmZ1bmN0aW9uIGRiZyhodG1sKSB7XG4gIGRiZ2Rpdi5pbm5lckhUTUwgPSBodG1sO1xufVxuXG5mdW5jdGlvbiBzZXREYXJrTW9kZSh2YWx1ZSkge1xuICBpZiAodmFsdWUpIHtcbiAgICB0b3Btb3N0ZGl2LmNsYXNzTGlzdC5hZGQoXCJkYXJrXCIpO1xuICB9IGVsc2Uge1xuICAgIHRvcG1vc3RkaXYuY2xhc3NMaXN0LnJlbW92ZShcImRhcmtcIik7XG4gIH1cbiAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJkYXJrbW9kZVwiLCB2YWx1ZSk7XG4gIHJlbmRlci5yZWRyYXdDYW52YXMoYWxsY2FudmFzLmZyb250KTtcbiAgcmVuZGVyLnJlZHJhd0NhbnZhcyhhbGxjYW52YXMuYmFjayk7XG59XG5cbmZ1bmN0aW9uIGdldFN0b3JlZENoZWNrYm94UmVmcyhjaGVja2JveCkge1xuICB2YXIgZXhpc3RpbmdSZWZzID0gZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImNoZWNrYm94X1wiICsgY2hlY2tib3gpO1xuICBpZiAoIWV4aXN0aW5nUmVmcykge1xuICAgIHJldHVybiBuZXcgU2V0KCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBTZXQoZXhpc3RpbmdSZWZzLnNwbGl0KFwiLFwiKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgcmVmZXJlbmNlcykge1xuICB2YXIgc3RvcmVkUmVmc1NldCA9IGdldFN0b3JlZENoZWNrYm94UmVmcyhjaGVja2JveCk7XG4gIHZhciBjdXJyZW50UmVmc1NldCA9IG5ldyBTZXQocmVmZXJlbmNlcyk7XG4gIC8vIEdldCBkaWZmZXJlbmNlIG9mIGN1cnJlbnQgLSBzdG9yZWRcbiAgdmFyIGRpZmZlcmVuY2UgPSBuZXcgU2V0KGN1cnJlbnRSZWZzU2V0KTtcbiAgZm9yIChyZWYgb2Ygc3RvcmVkUmVmc1NldCkge1xuICAgIGRpZmZlcmVuY2UuZGVsZXRlKHJlZik7XG4gIH1cbiAgaWYgKGRpZmZlcmVuY2Uuc2l6ZSA9PSAwKSB7XG4gICAgLy8gQWxsIHRoZSBjdXJyZW50IHJlZnMgYXJlIHN0b3JlZFxuICAgIHJldHVybiBcImNoZWNrZWRcIjtcbiAgfSBlbHNlIGlmIChkaWZmZXJlbmNlLnNpemUgPT0gY3VycmVudFJlZnNTZXQuc2l6ZSkge1xuICAgIC8vIE5vbmUgb2YgdGhlIGN1cnJlbnQgcmVmcyBhcmUgc3RvcmVkXG4gICAgcmV0dXJuIFwidW5jaGVja2VkXCI7XG4gIH0gZWxzZSB7XG4gICAgLy8gU29tZSBvZiB0aGUgcmVmcyBhcmUgc3RvcmVkXG4gICAgcmV0dXJuIFwiaW5kZXRlcm1pbmF0ZVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEJvbUNoZWNrYm94U3RhdGUoY2hlY2tib3gsIGVsZW1lbnQsIHJlZmVyZW5jZXMpIHtcbiAgdmFyIHN0YXRlID0gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgcmVmZXJlbmNlcyk7XG4gIGVsZW1lbnQuY2hlY2tlZCA9IChzdGF0ZSA9PSBcImNoZWNrZWRcIik7XG4gIGVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IChzdGF0ZSA9PSBcImluZGV0ZXJtaW5hdGVcIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoZWNrYm94Q2hhbmdlSGFuZGxlcihjaGVja2JveCwgcmVmZXJlbmNlcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmVmc1NldCA9IGdldFN0b3JlZENoZWNrYm94UmVmcyhjaGVja2JveCk7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgLy8gY2hlY2tib3ggdGlja2VkXG4gICAgICBmb3IgKHZhciByZWYgb2YgcmVmZXJlbmNlcykge1xuICAgICAgICByZWZzU2V0LmFkZChyZWYpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVja2JveCB1bnRpY2tlZFxuICAgICAgZm9yICh2YXIgcmVmIG9mIHJlZmVyZW5jZXMpIHtcbiAgICAgICAgcmVmc1NldC5kZWxldGUocmVmKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJjaGVja2JveF9cIiArIGNoZWNrYm94LCBbLi4ucmVmc1NldF0uam9pbihcIixcIikpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvd0hpZ2hsaWdodEhhbmRsZXIocm93aWQsIHJlZnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkgPT0gcm93aWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0ZWRcIik7XG4gICAgfVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvd2lkKS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0ZWRcIik7XG4gICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZChyb3dpZCk7XG4gICAgZ2xvYmFsRGF0YS5zZXRIaWdobGlnaHRlZFJlZnMocmVmcyk7XG4gICAgcmVuZGVyLmRyYXdIaWdobGlnaHRzKCk7XG4gIH1cbn1cblxuLy9YWFggVEhpcyBmdW5jdGlvbiBoYXMgZmlsdGVyLiBGaWx0ZXIgaXMgbm90IGdsb2JhbC4gV2hlcmUgZG9lcyBpdCBjb21lIGZyb20gdGhlblxuZnVuY3Rpb24gZW50cnlNYXRjaGVzKGVudHJ5KSB7XG4gIC8vIGNoZWNrIHJlZnNcbiAgZm9yICh2YXIgcmVmIG9mIGVudHJ5WzNdKSB7XG4gICAgaWYgKHJlZi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyKSA+PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgLy8gY2hlY2sgdmFsdWVcbiAgaWYgKGVudHJ5WzFdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID49IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBjaGVjayBmb290cHJpbnRcbiAgaWYgKGVudHJ5WzJdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID49IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZpbmRSZWZJbkVudHJ5KGVudHJ5KSB7XG4gIGZvciAodmFyIHJlZiBvZiBlbnRyeVszXSkge1xuICAgIGlmIChyZWYudG9Mb3dlckNhc2UoKSA9PSByZWZsb29rdXApIHtcbiAgICAgIHJldHVybiBbcmVmXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRGaWx0ZXIocykge1xuICBpZiAoIWZpbHRlcikge1xuICAgIHJldHVybiBzO1xuICB9XG4gIHZhciBwYXJ0cyA9IHMudG9Mb3dlckNhc2UoKS5zcGxpdChmaWx0ZXIpO1xuICBpZiAocGFydHMubGVuZ3RoID09IDEpIHtcbiAgICByZXR1cm4gcztcbiAgfVxuICB2YXIgciA9IFwiXCI7XG4gIHZhciBwb3MgPSAwO1xuICBmb3IgKHZhciBpIGluIHBhcnRzKSB7XG4gICAgaWYgKGkgPiAwKSB7XG4gICAgICByICs9ICc8bWFyayBjbGFzcz1cImhpZ2hsaWdodFwiPicgK1xuICAgICAgICBzLnN1YnN0cmluZyhwb3MsIHBvcyArIGZpbHRlci5sZW5ndGgpICtcbiAgICAgICAgJzwvbWFyaz4nO1xuICAgICAgcG9zICs9IGZpbHRlci5sZW5ndGg7XG4gICAgfVxuICAgIHIgKz0gcy5zdWJzdHJpbmcocG9zLCBwb3MgKyBwYXJ0c1tpXS5sZW5ndGgpO1xuICAgIHBvcyArPSBwYXJ0c1tpXS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGNoZWNrYm94U2V0VW5zZXRBbGxIYW5kbGVyKGNoZWNrYm94bmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoZWNrYm94bnVtID0gMDtcbiAgICB3aGlsZSAoY2hlY2tib3hudW0gPCBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGggJiZcbiAgICAgIGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpW2NoZWNrYm94bnVtXS50b0xvd2VyQ2FzZSgpICE9IGNoZWNrYm94bmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjaGVja2JveG51bSsrO1xuICAgIH1cbiAgICBpZiAoY2hlY2tib3hudW0gPj0gZ2xvYmFsRGF0YS5nZXRDaGVja2JveGVzKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhbGxzZXQgPSB0cnVlO1xuICAgIHZhciBjaGVja2JveDtcbiAgICB2YXIgcm93O1xuICAgIGZvciAocm93IG9mIGJvbWJvZHkuY2hpbGROb2Rlcykge1xuICAgICAgY2hlY2tib3ggPSByb3cuY2hpbGROb2Rlc1tjaGVja2JveG51bSArIDFdLmNoaWxkTm9kZXNbMF07XG4gICAgICBpZiAoIWNoZWNrYm94LmNoZWNrZWQgfHwgY2hlY2tib3guaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICBhbGxzZXQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAocm93IG9mIGJvbWJvZHkuY2hpbGROb2Rlcykge1xuICAgICAgY2hlY2tib3ggPSByb3cuY2hpbGROb2Rlc1tjaGVja2JveG51bSArIDFdLmNoaWxkTm9kZXNbMF07XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gIWFsbHNldDtcbiAgICAgIGNoZWNrYm94LmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIGNoZWNrYm94Lm9uY2hhbmdlKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbHVtbkhlYWRlcihuYW1lLCBjbHMsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlRIXCIpO1xuICB0aC5pbm5lckhUTUwgPSBuYW1lO1xuICB0aC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gIHRoLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJTUEFOXCIpO1xuICBzcGFuLmNsYXNzTGlzdC5hZGQoXCJzb3J0bWFya1wiKTtcbiAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcbiAgdGguYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIHRoLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpICYmIHRoaXMgIT09IGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKSkge1xuICAgICAgLy8gQ3VycmVudGx5IHNvcnRlZCBieSBhbm90aGVyIGNvbHVtblxuICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZShnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0T3JkZXIoKSk7XG4gICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcbiAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRDb2x1bW4obnVsbCk7XG4gICAgICBnbG9iYWxEYXRhLnNldEN1cnJlbnRTb3J0T3JkZXIobnVsbCk7XG4gICAgfVxuICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkgJiYgdGhpcyA9PT0gZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpKSB7XG4gICAgICAvLyBBbHJlYWR5IHNvcnRlZCBieSB0aGlzIGNvbHVtblxuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRPcmRlcigpID09IFwiYXNjXCIpIHtcbiAgICAgICAgLy8gU29ydCBieSB0aGlzIGNvbHVtbiwgZGVzY2VuZGluZyBvcmRlclxuICAgICAgICBnbG9iYWxEYXRhLnNldEJvbVNvcnRGdW5jdGlvbihmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIC1jb21wYXJhdG9yKGEsIGIpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZShcImFzY1wiKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZChcImRlc2NcIik7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRPcmRlcihcImRlc2NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVbnNvcnRcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRCb21Tb3J0RnVuY3Rpb24obnVsbCk7XG4gICAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXNjXCIpO1xuICAgICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydENvbHVtbihudWxsKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydE9yZGVyKG51bGwpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb3J0IGJ5IHRoaXMgY29sdW1uLCBhc2NlbmRpbmcgb3JkZXJcbiAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU29ydEZ1bmN0aW9uKGNvbXBhcmF0b3IpO1xuICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydENvbHVtbih0aGlzKTtcbiAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJub25lXCIpO1xuICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZChcImFzY1wiKTtcbiAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRPcmRlcihcImFzY1wiKTtcbiAgICB9XG4gICAgcG9wdWxhdGVCb21Cb2R5KCk7XG4gIH1cbiAgcmV0dXJuIHRoO1xufVxuXG5mdW5jdGlvbiBmYW5jeURibENsaWNrSGFuZGxlcihlbCwgb25zaW5nbGUsIG9uZG91YmxlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1kYmxjbGlja1wiKSA9PSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRibGNsaWNrXCIsIDEpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZShcImRhdGEtZGJsY2xpY2tcIikgPT0gMSkge1xuICAgICAgICAgIG9uc2luZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1kYmxjbGlja1wiKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtZGJsY2xpY2tcIik7XG4gICAgICBvbmRvdWJsZSgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUJvbUhlYWRlcigpIHtcbiAgd2hpbGUgKGJvbWhlYWQuZmlyc3RDaGlsZCkge1xuICAgIGJvbWhlYWQucmVtb3ZlQ2hpbGQoYm9taGVhZC5maXJzdENoaWxkKTtcbiAgfVxuICB2YXIgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVFJcIik7XG4gIHZhciB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJUSFwiKTtcbiAgdGguY2xhc3NMaXN0LmFkZChcIm51bUNvbFwiKTtcbiAgdHIuYXBwZW5kQ2hpbGQodGgpO1xuICBnbG9iYWxEYXRhLnNldENoZWNrYm94ZXMoZ2xvYmFsRGF0YS5nZXRCb21DaGVja2JveGVzKCkuc3BsaXQoXCIsXCIpLmZpbHRlcigoZSkgPT4gZSkpO1xuICB2YXIgY2hlY2tib3hDb21wYXJlQ2xvc3VyZSA9IGZ1bmN0aW9uKGNoZWNrYm94KSB7XG4gICAgcmV0dXJuIChhLCBiKSA9PiB7XG4gICAgICB2YXIgc3RhdGVBID0gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgYVszXSk7XG4gICAgICB2YXIgc3RhdGVCID0gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgYlszXSk7XG4gICAgICBpZiAoc3RhdGVBID4gc3RhdGVCKSByZXR1cm4gLTE7XG4gICAgICBpZiAoc3RhdGVBIDwgc3RhdGVCKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICBmb3IgKHZhciBjaGVja2JveCBvZiBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKSkge1xuICAgIHRoID0gY3JlYXRlQ29sdW1uSGVhZGVyKFxuICAgICAgY2hlY2tib3gsIFwiYm9tLWNoZWNrYm94XCIsIGNoZWNrYm94Q29tcGFyZUNsb3N1cmUoY2hlY2tib3gpKTtcbiAgICB0aC5vbmNsaWNrID0gZmFuY3lEYmxDbGlja0hhbmRsZXIoXG4gICAgICB0aCwgdGgub25jbGljay5iaW5kKHRoKSwgY2hlY2tib3hTZXRVbnNldEFsbEhhbmRsZXIoY2hlY2tib3gpKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0aCk7XG4gIH1cbiAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29sdW1uSGVhZGVyKFwiUmVmZXJlbmNlc1wiLCBcIlJlZmVyZW5jZXNcIiwgKGEsIGIpID0+IHtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBhWzNdLmxlbmd0aCAmJiBpIDwgYlszXS5sZW5ndGgpIHtcbiAgICAgIGlmIChhWzNdW2ldICE9IGJbM11baV0pIHJldHVybiBhWzNdW2ldID4gYlszXVtpXSA/IDEgOiAtMTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGFbM10ubGVuZ3RoIC0gYlszXS5sZW5ndGg7XG4gIH0pKTtcbiAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29sdW1uSGVhZGVyKFwiVmFsdWVcIiwgXCJWYWx1ZVwiLCAoYSwgYikgPT4ge1xuICAgIGlmIChhWzFdICE9IGJbMV0pIHJldHVybiBhWzFdID4gYlsxXSA/IDEgOiAtMTtcbiAgICBlbHNlIHJldHVybiAwO1xuICB9KSk7XG4gIHRyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbHVtbkhlYWRlcihcIkZvb3RwcmludFwiLCBcIkZvb3RwcmludFwiLCAoYSwgYikgPT4ge1xuICAgIGlmIChhWzJdICE9IGJbMl0pIHJldHVybiBhWzJdID4gYlsyXSA/IDEgOiAtMTtcbiAgICBlbHNlIHJldHVybiAwO1xuICB9KSk7XG5cbiAgYm9taGVhZC5hcHBlbmRDaGlsZCh0cik7XG59XG5cbi8vVE9ETzogVGhpcyBzaG91bGQgYmUgcmV3cml0dGVuIHRvIGludGVyYWN0IHdpdGgganNvbiB1c2luZyB0aGUgdGFncyBpbnN0ZWFkIG9mIFxuLy8gICAgICBoYXZpbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBoYXJkY29kZWQuXG5mdW5jdGlvbiBwb3B1bGF0ZUJvbUJvZHkoKSB7XG4gIHdoaWxlIChib20uZmlyc3RDaGlsZCkge1xuICAgIGJvbS5yZW1vdmVDaGlsZChib20uZmlyc3RDaGlsZCk7XG4gIH1cbiAgZ2xvYmFsRGF0YS5zZXRIaWdobGlnaHRIYW5kbGVycyhbXSk7XG4gIGdsb2JhbERhdGEuc2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQobnVsbCk7XG4gIHZhciBmaXJzdCA9IHRydWU7XG4gIGNvbnNvbGUubG9nKGdsb2JhbERhdGEuZ2V0Q2FudmFzTGF5b3V0KCkpXG4gIHN3aXRjaCAoZ2xvYmFsRGF0YS5nZXRDYW52YXNMYXlvdXQoKSkge1xuICAgIGNhc2UgJ0YnOlxuICAgICAgYm9tdGFibGUgPSBwY2JkYXRhLmJvbS5GO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRkInOlxuICAgICAgYm9tdGFibGUgPSBwY2JkYXRhLmJvbS5ib3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQic6XG4gICAgICBib210YWJsZSA9IHBjYmRhdGEuYm9tLkI7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoZ2xvYmFsRGF0YS5nZXRCb21Tb3J0RnVuY3Rpb24oKSkge1xuICAgIGJvbXRhYmxlID0gYm9tdGFibGUuc2xpY2UoKS5zb3J0KGdsb2JhbERhdGEuZ2V0Qm9tU29ydEZ1bmN0aW9uKCkpO1xuICB9XG4gIGZvciAodmFyIGkgaW4gYm9tdGFibGUpIHtcbiAgICB2YXIgYm9tZW50cnkgPSBib210YWJsZVtpXTtcbiAgICBpZiAoZmlsdGVyICYmICFlbnRyeU1hdGNoZXMoYm9tZW50cnkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdmFyIHJlZmVyZW5jZXMgPSBib21lbnRyeVsyXTtcbiAgICBpZiAocmVmbG9va3VwKSB7XG4gICAgICByZWZlcmVuY2VzID0gZmluZFJlZkluRW50cnkoYm9tZW50cnkpO1xuICAgICAgaWYgKCFyZWZlcmVuY2VzKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVFJcIik7XG4gICAgdmFyIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlREXCIpO1xuICAgIHZhciByb3dudW0gPSAraSArIDE7XG4gICAgdHIuaWQgPSBcImJvbXJvd1wiICsgcm93bnVtO1xuICAgIHRkLnRleHRDb250ZW50ID0gcm93bnVtO1xuICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcbiAgICAvLyBDaGVja2JveGVzXG4gICAgZm9yICh2YXIgY2hlY2tib3ggb2YgZ2xvYmFsRGF0YS5nZXRDaGVja2JveGVzKCkpIHtcbiAgICAgIGlmIChjaGVja2JveCkge1xuICAgICAgICB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJURFwiKTtcbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICBpbnB1dC5vbmNoYW5nZSA9IGNyZWF0ZUNoZWNrYm94Q2hhbmdlSGFuZGxlcihjaGVja2JveCwgcmVmZXJlbmNlcyk7XG4gICAgICAgIHNldEJvbUNoZWNrYm94U3RhdGUoY2hlY2tib3gsIGlucHV0LCByZWZlcmVuY2VzKTtcbiAgICAgICAgdGQuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vSU5GTzogVGhlIGxpbmVzIGJlbG93IGFkZCB0aGUgY29udHJvbCB0aGUgY29sdW1ucyBvbiB0aGUgYm9tIHRhYmxlXG4gICAgLy8gUmVmZXJlbmNlc1xuICAgIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlREXCIpO1xuICAgIHRkLmlubmVySFRNTCA9IGhpZ2hsaWdodEZpbHRlcihyZWZlcmVuY2VzLmpvaW4oXCIsIFwiKSk7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIC8vIFZhbHVlXG4gICAgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XG4gICAgdGQuaW5uZXJIVE1MID0gaGlnaGxpZ2h0RmlsdGVyKGJvbWVudHJ5WzFdKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgLy8gRm9vdHByaW50XG4gICAgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XG4gICAgdGQuaW5uZXJIVE1MID0gaGlnaGxpZ2h0RmlsdGVyKGJvbWVudHJ5WzJdKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG5cblxuXG4gICAgYm9tLmFwcGVuZENoaWxkKHRyKTtcbiAgICB2YXIgaGFuZGxlciA9IGNyZWF0ZVJvd0hpZ2hsaWdodEhhbmRsZXIodHIuaWQsIHJlZmVyZW5jZXMpO1xuICAgIHRyLm9ubW91c2Vtb3ZlID0gaGFuZGxlcjtcbiAgICBnbG9iYWxEYXRhLnB1c2hIaWdobGlnaHRIYW5kbGVycyh7XG4gICAgICBpZDogdHIuaWQsXG4gICAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgICAgcmVmczogcmVmZXJlbmNlc1xuICAgIH0pO1xuICAgIGlmICgoZmlsdGVyIHx8IHJlZmxvb2t1cCkgJiYgZmlyc3QpIHtcbiAgICAgIGhhbmRsZXIoKTtcbiAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNtb290aFNjcm9sbFRvUm93KHJvd2lkKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvd2lkKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgYmxvY2s6IFwiY2VudGVyXCIsXG4gICAgaW5saW5lOiBcIm5lYXJlc3RcIlxuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0UHJldmlvdXNSb3coKSB7XG4gIGlmICghZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XG4gICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2dsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggLSAxXS5oYW5kbGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggPiAxICYmXG4gICAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbMF0uaWQgPT0gZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XG4gICAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpLmxlbmd0aCAtIDFdLmhhbmRsZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmIChnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbaSArIDFdLmlkID09IGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkge1xuICAgICAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtpXS5oYW5kbGVyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc21vb3RoU2Nyb2xsVG9Sb3coZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0TmV4dFJvdygpIHtcbiAgaWYgKCFnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcbiAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbMF0uaGFuZGxlcigpO1xuICB9IGVsc2Uge1xuICAgIGlmIChnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkubGVuZ3RoID4gMSAmJlxuICAgICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2dsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggLSAxXS5pZCA9PSBnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcbiAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVswXS5oYW5kbGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbaSAtIDFdLmlkID09IGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkge1xuICAgICAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtpXS5oYW5kbGVyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc21vb3RoU2Nyb2xsVG9Sb3coZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVCb21UYWJsZSgpIHtcbiAgcG9wdWxhdGVCb21IZWFkZXIoKTtcbiAgcG9wdWxhdGVCb21Cb2R5KCk7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNDbGlja2VkKHJlZmVyZW5jZXMpIHtcbiAgdmFyIGxhc3RDbGlja2VkSW5kZXggPSByZWZlcmVuY2VzLmluZGV4T2YoZ2xvYmFsRGF0YS5nZXRMYXN0Q2xpY2tlZFJlZigpKTtcbiAgdmFyIHJlZiA9IHJlZmVyZW5jZXNbKGxhc3RDbGlja2VkSW5kZXggKyAxKSAlIHJlZmVyZW5jZXMubGVuZ3RoXTtcbiAgZm9yICh2YXIgaGFuZGxlciBvZiBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkpIHtcbiAgICBpZiAoaGFuZGxlci5yZWZzLmluZGV4T2YocmVmKSA+PSAwKSB7XG4gICAgICBnbG9iYWxEYXRhLnNldExhc3RDbGlja2VkUmVmKHJlZik7XG4gICAgICBoYW5kbGVyLmhhbmRsZXIoKTtcbiAgICAgIHNtb290aFNjcm9sbFRvUm93KGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRmlsdGVyKGlucHV0KSB7XG4gIGZpbHRlciA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gIHBvcHVsYXRlQm9tVGFibGUoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUmVmTG9va3VwKGlucHV0KSB7XG4gIHJlZmxvb2t1cCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gIHBvcHVsYXRlQm9tVGFibGUoKTtcbn1cblxuZnVuY3Rpb24gc2lsa3NjcmVlblZpc2libGUodmlzaWJsZSkge1xuICBpZiAodmlzaWJsZSkge1xuICAgIGFsbGNhbnZhcy5mcm9udC5zaWxrLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgIGFsbGNhbnZhcy5iYWNrLnNpbGsuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJzaWxrc2NyZWVuVmlzaWJsZVwiLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBhbGxjYW52YXMuZnJvbnQuc2lsay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgYWxsY2FudmFzLmJhY2suc2lsay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJzaWxrc2NyZWVuVmlzaWJsZVwiLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlQ2FudmFzTGF5b3V0KGxheW91dCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsLWJ0blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVwcmVzc2VkXCIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZiLWJ0blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVwcmVzc2VkXCIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsLWJ0blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVwcmVzc2VkXCIpO1xuICBzd2l0Y2ggKGxheW91dCkge1xuICAgIGNhc2UgJ0YnOlxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbC1idG5cIikuY2xhc3NMaXN0LmFkZChcImRlcHJlc3NlZFwiKTtcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbUxheW91dCgpICE9IFwiQk9NXCIpIHtcbiAgICAgICAgZ2xvYmFsRGF0YS5jb2xsYXBzZUNhbnZhc1NwbGl0KDEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQic6XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsLWJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiZGVwcmVzc2VkXCIpO1xuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tTGF5b3V0KCkgIT0gXCJCT01cIikge1xuICAgICAgICBnbG9iYWxEYXRhLmNvbGxhcHNlQ2FudmFzU3BsaXQoMCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmYi1idG5cIikuY2xhc3NMaXN0LmFkZChcImRlcHJlc3NlZFwiKTtcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbUxheW91dCgpICE9IFwiQk9NXCIpIHtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRTaXplc0NhbnZhc1NwbGl0KFs1MCwgNTBdKTtcbiAgICAgIH1cbiAgfVxuICBnbG9iYWxEYXRhLnNldENhbnZhc0xheW91dChsYXlvdXQpO1xuICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcImNhbnZhc2xheW91dFwiLCBsYXlvdXQpO1xuICByZW5kZXIucmVzaXplQWxsKCk7XG4gIHBvcHVsYXRlQm9tVGFibGUoKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVNZXRhZGF0YSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS5pbm5lckhUTUwgICAgPSBwY2JkYXRhLm1ldGFkYXRhLnRpdGxlO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJldmlzaW9uXCIpLmlubmVySFRNTCA9IFwiUmV2OiBcIiArIHBjYmRhdGEubWV0YWRhdGEucmV2aXNpb247XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcGFueVwiKS5pbm5lckhUTUwgID0gcGNiZGF0YS5tZXRhZGF0YS5jb21wYW55O1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGVkYXRlXCIpLmlubmVySFRNTCA9IHBjYmRhdGEubWV0YWRhdGEuZGF0ZTtcbiAgaWYgKHBjYmRhdGEubWV0YWRhdGEudGl0bGUgIT0gXCJcIikge1xuICAgIGRvY3VtZW50LnRpdGxlID0gcGNiZGF0YS5tZXRhZGF0YS50aXRsZSArIFwiIEJPTVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZUJvbUxheW91dChsYXlvdXQpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib20tYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibHItYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGItYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIHN3aXRjaCAobGF5b3V0KSB7XG4gICAgY2FzZSAnQk9NJzpcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9tLWJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiZGVwcmVzc2VkXCIpO1xuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tU3BsaXQoKSkge1xuICAgICAgICBnbG9iYWxEYXRhLmRlc3Ryb3lCb21TcGxpdCgpO1xuICAgICAgICBnbG9iYWxEYXRhLnNldEJvbVNwbGl0KG51bGwpO1xuICAgICAgICBnbG9iYWxEYXRhLmRlc3Ryb3lDYW52YXNTcGxpdCgpO1xuICAgICAgICBnbG9iYWxEYXRhLnNldENhbnZhc1NwbGl0KG51bGwpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udGNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RcIikuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1RCJzpcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGItYnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJkZXByZXNzZWRcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrY2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RcIikuc3R5bGUuaGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSA4MHB4KVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21kaXZcIikuY2xhc3NMaXN0LnJlbW92ZShcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc2RpdlwiKS5jbGFzc0xpc3QucmVtb3ZlKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIikuY2xhc3NMaXN0LmFkZChcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuY2xhc3NMaXN0LmFkZChcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRCb21TcGxpdCgpKSB7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUJvbVNwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQobnVsbCk7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUNhbnZhc1NwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQobnVsbCk7XG4gICAgICB9XG4gICAgICBnbG9iYWxEYXRhLnNldEJvbVNwbGl0KFNwbGl0KFsnI2JvbWRpdicsICcjY2FudmFzZGl2J10sIHtcbiAgICAgICAgc2l6ZXM6IFs1MCwgNTBdLFxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGwsXG4gICAgICAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICBndXR0ZXJTaXplOiA1XG4gICAgICB9KSk7XG4gICAgICBnbG9iYWxEYXRhLnNldENhbnZhc1NwbGl0KFNwbGl0KFsnI2Zyb250Y2FudmFzJywgJyNiYWNrY2FudmFzJ10sIHtcbiAgICAgICAgc2l6ZXM6IFs1MCwgNTBdLFxuICAgICAgICBndXR0ZXJTaXplOiA1LFxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGxcbiAgICAgIH0pKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xSJzpcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibHItYnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJkZXByZXNzZWRcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrY2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RcIikuc3R5bGUuaGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSA4MHB4KVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21kaXZcIikuY2xhc3NMaXN0LmFkZChcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc2RpdlwiKS5jbGFzc0xpc3QuYWRkKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIikuY2xhc3NMaXN0LnJlbW92ZShcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuY2xhc3NMaXN0LnJlbW92ZShcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRCb21TcGxpdCgpKSB7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUJvbVNwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQobnVsbCk7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUNhbnZhc1NwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQobnVsbCk7XG4gICAgICB9XG4gICAgICBnbG9iYWxEYXRhLnNldEJvbVNwbGl0KFNwbGl0KFsnI2JvbWRpdicsICcjY2FudmFzZGl2J10sIHtcbiAgICAgICAgc2l6ZXM6IFs1MCwgNTBdLFxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGwsXG4gICAgICAgIGd1dHRlclNpemU6IDVcbiAgICAgIH0pKTtcbiAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQoU3BsaXQoWycjZnJvbnRjYW52YXMnLCAnI2JhY2tjYW52YXMnXSwge1xuICAgICAgICBzaXplczogWzUwLCA1MF0sXG4gICAgICAgIGd1dHRlclNpemU6IDUsXG4gICAgICAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGxcbiAgICAgIH0pKTtcbiAgfVxuICBnbG9iYWxEYXRhLnNldEJvbUxheW91dChsYXlvdXQpO1xuICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcImJvbWxheW91dFwiLCBsYXlvdXQpO1xuICBjaGFuZ2VDYW52YXNMYXlvdXQoZ2xvYmFsRGF0YS5nZXRDYW52YXNMYXlvdXQoKSk7XG59XG5cbmZ1bmN0aW9uIGZvY3VzSW5wdXRGaWVsZChpbnB1dCkge1xuICBpbnB1dC5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gIGlucHV0LmZvY3VzKCk7XG4gIGlucHV0LnNlbGVjdCgpO1xufVxuXG5mdW5jdGlvbiBmb2N1c0ZpbHRlckZpZWxkKCkge1xuICBmb2N1c0lucHV0RmllbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWx0ZXJcIikpO1xufVxuXG5mdW5jdGlvbiBmb2N1c1JlZkxvb2t1cEZpZWxkKCkge1xuICBmb2N1c0lucHV0RmllbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWZsb29rdXBcIikpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVCb21DaGVja2JveChib21yb3dpZCwgY2hlY2tib3hudW0pIHtcbiAgaWYgKCFib21yb3dpZCB8fCBjaGVja2JveG51bSA+IGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgYm9tcm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9tcm93aWQpO1xuICB2YXIgY2hlY2tib3ggPSBib21yb3cuY2hpbGROb2Rlc1tjaGVja2JveG51bV0uY2hpbGROb2Rlc1swXTtcbiAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xuICBjaGVja2JveC5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gIGNoZWNrYm94Lm9uY2hhbmdlKCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQm9tQ2hlY2tib3goYm9tcm93aWQsIGNoZWNrYm94bmFtZSkge1xuICB2YXIgY2hlY2tib3hudW0gPSAwO1xuICB3aGlsZSAoY2hlY2tib3hudW0gPCBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGggJiZcbiAgICBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKVtjaGVja2JveG51bV0udG9Mb3dlckNhc2UoKSAhPSBjaGVja2JveG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNoZWNrYm94bnVtKys7XG4gIH1cbiAgaWYgKCFib21yb3dpZCB8fCBjaGVja2JveG51bSA+PSBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGJvbXJvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJvbXJvd2lkKTtcbiAgdmFyIGNoZWNrYm94ID0gYm9tcm93LmNoaWxkTm9kZXNbY2hlY2tib3hudW0gKyAxXS5jaGlsZE5vZGVzWzBdO1xuICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgY2hlY2tib3guaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICBjaGVja2JveC5vbmNoYW5nZSgpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUd1dHRlck5vZGUobm9kZSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChub2RlLmNoaWxkTm9kZXNbaV0uY2xhc3NMaXN0ICYmXG4gICAgICBub2RlLmNoaWxkTm9kZXNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3V0dGVyXCIpKSB7XG4gICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1tpXSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYW5HdXR0ZXJzKCkge1xuICByZW1vdmVHdXR0ZXJOb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm90XCIpKTtcbiAgcmVtb3ZlR3V0dGVyTm9kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc2RpdlwiKSk7XG59XG5cbmZ1bmN0aW9uIHNldEJvbUNoZWNrYm94ZXModmFsdWUpIHtcbiAgZ2xvYmFsRGF0YS5zZXRCb21DaGVja2JveGVzKHZhbHVlKTtcbiAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJib21DaGVja2JveGVzXCIsIHZhbHVlKTtcbiAgcG9wdWxhdGVCb21UYWJsZSgpO1xufVxuXG5kb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XG4gIHN3aXRjaCAoZS5rZXkpIHtcbiAgICBjYXNlIFwiblwiOlxuICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudHlwZSA9PSBcInRleHRcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpICE9PSBudWxsKSB7XG4gICAgICAgIGNoZWNrQm9tQ2hlY2tib3goZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpLCBcInBsYWNlZFwiKTtcbiAgICAgICAgaGlnaGxpZ2h0TmV4dFJvdygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgaGlnaGxpZ2h0UHJldmlvdXNSb3coKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgIGhpZ2hsaWdodE5leHRSb3coKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoZS5hbHRLZXkpIHtcbiAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICBjYXNlIFwiZlwiOlxuICAgICAgICBmb2N1c0ZpbHRlckZpZWxkKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiclwiOlxuICAgICAgICBmb2N1c1JlZkxvb2t1cEZpZWxkKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwielwiOlxuICAgICAgICBjaGFuZ2VCb21MYXlvdXQoXCJCT01cIik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwieFwiOlxuICAgICAgICBjaGFuZ2VCb21MYXlvdXQoXCJMUlwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJjXCI6XG4gICAgICAgIGNoYW5nZUJvbUxheW91dChcIlRCXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInZcIjpcbiAgICAgICAgY2hhbmdlQ2FudmFzTGF5b3V0KFwiRlwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgIGNoYW5nZUNhbnZhc0xheW91dChcIkZCXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIm5cIjpcbiAgICAgICAgY2hhbmdlQ2FudmFzTGF5b3V0KFwiQlwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoZS5rZXkgPj0gJzEnICYmIGUua2V5IDw9ICc5Jykge1xuICAgICAgdG9nZ2xlQm9tQ2hlY2tib3goY3VycmVudEhpZ2hsaWdodGVkUm93SWQsIHBhcnNlSW50KGUua2V5KSk7XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gIGdsb2JhbERhdGEuaW5pdFN0b3JhZ2UoKTtcbiAgY2xlYW5HdXR0ZXJzKCk7XG4gIHJlbmRlci5pbml0UmVuZGVyKCk7XG4gIGRiZ2RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGJnXCIpO1xuICBib20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbWJvZHlcIik7XG4gIGJvbWhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbWhlYWRcIik7XG4gIGdsb2JhbERhdGEuc2V0Qm9tTGF5b3V0KGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJib21sYXlvdXRcIikpO1xuICBpZiAoIWdsb2JhbERhdGEuZ2V0Qm9tTGF5b3V0KCkpIHtcbiAgICBnbG9iYWxEYXRhLnNldEJvbUxheW91dChcIkxSXCIpO1xuICB9XG4gIGdsb2JhbERhdGEuc2V0Q2FudmFzTGF5b3V0KGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJjYW52YXNsYXlvdXRcIikpO1xuICBpZiAoIWdsb2JhbERhdGEuZ2V0Q2FudmFzTGF5b3V0KCkpIHtcbiAgICBnbG9iYWxEYXRhLnNldENhbnZhc0xheW91dChcIkZCXCIpO1xuICB9XG4gIGZpbHRlciA9IFwiXCI7XG4gIHJlZmxvb2t1cCA9IFwiXCI7XG4gIHBvcHVsYXRlTWV0YWRhdGEoKTtcbiAgZ2xvYmFsRGF0YS5zZXRCb21DaGVja2JveGVzKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJib21DaGVja2JveGVzXCIpKTtcbiAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tQ2hlY2tib3hlcygpID09PSBudWxsKSB7XG4gICAgZ2xvYmFsRGF0YS5zZXRCb21DaGVja2JveGVzKFwiU291cmNlZCxQbGFjZWRcIik7XG4gIH1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21DaGVja2JveGVzXCIpLnZhbHVlID0gZ2xvYmFsRGF0YS5nZXRCb21DaGVja2JveGVzKCk7XG4gIGlmIChnbG9iYWxEYXRhLnJlYWRTdG9yYWdlKFwic2lsa3NjcmVlblZpc2libGVcIikgPT09IFwiZmFsc2VcIikge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lsa3NjcmVlbkNoZWNrYm94XCIpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICBzaWxrc2NyZWVuVmlzaWJsZShmYWxzZSk7XG4gIH1cbiAgaWYgKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJyZWRyYXdPbkRyYWdcIikgPT09IFwiZmFsc2VcIikge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJhZ0NoZWNrYm94XCIpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICBnbG9iYWxEYXRhLnNldFJlZHJhd09uRHJhZyhmYWxzZSk7XG4gIH1cbiAgaWYgKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJkYXJrbW9kZVwiKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhcmttb2RlQ2hlY2tib3hcIikuY2hlY2tlZCA9IHRydWU7XG4gICAgc2V0RGFya01vZGUodHJ1ZSk7XG4gIH1cbiAgaWYgKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJoaWdobGlnaHRwaW4xXCIpID09PSBcInRydWVcIikge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaGxpZ2h0cGluMUNoZWNrYm94XCIpLmNoZWNrZWQgPSB0cnVlO1xuICAgIGdsb2JhbERhdGEuc2V0SGlnaGxpZ2h0UGluMSh0cnVlKTtcbiAgICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5mcm9udCk7XG4gICAgcmVuZGVyLnJlZHJhd0NhbnZhcyhhbGxjYW52YXMuYmFjayk7XG4gIH1cbiAgYm9hcmRSb3RhdGlvbiA9IGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJib2FyZFJvdGF0aW9uXCIpO1xuICBpZiAoYm9hcmRSb3RhdGlvbiA9PT0gbnVsbCkge1xuICAgIGJvYXJkUm90YXRpb24gPSAwO1xuICB9IGVsc2Uge1xuICAgIGJvYXJkUm90YXRpb24gPSBwYXJzZUludChib2FyZFJvdGF0aW9uKTtcbiAgfVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkUm90YXRpb25cIikudmFsdWUgPSBib2FyZFJvdGF0aW9uIC8gNTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGlvbkRlZ3JlZVwiKS50ZXh0Q29udGVudCA9IGJvYXJkUm90YXRpb247XG4gIC8vIFRyaWdnZXJzIHJlbmRlclxuICBjaGFuZ2VCb21MYXlvdXQoZ2xvYmFsRGF0YS5nZXRCb21MYXlvdXQoKSk7XG59XG5cbndpbmRvdy5vbnJlc2l6ZSA9IHJlbmRlci5yZXNpemVBbGw7XG53aW5kb3cubWF0Y2hNZWRpYShcInByaW50XCIpLmFkZExpc3RlbmVyKHJlbmRlci5yZXNpemVBbGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0RGFya01vZGUsIHNpbGtzY3JlZW5WaXNpYmxlLCB1cGRhdGVGaWx0ZXIsIHVwZGF0ZVJlZkxvb2t1cCwgY2hhbmdlQm9tTGF5b3V0LCBjaGFuZ2VDYW52YXNMYXlvdXQsIHNldEJvbUNoZWNrYm94ZXNcbn0iLCIvKiBQQ0IgcmVuZGVyaW5nIGNvZGUgKi9cclxuXHJcbnZhciBnbG9iYWxEYXRhID0gcmVxdWlyZSgnLi9nbG9iYWwuanMnKVxyXG5cclxuZnVuY3Rpb24gZGVnMnJhZChkZWcpIHtcclxuICByZXR1cm4gZGVnICogTWF0aC5QSSAvIDE4MDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY0ZvbnRQb2ludChsaW5lcG9pbnQsIHRleHQsIG9mZnNldHgsIG9mZnNldHksIHRpbHQpIHtcclxuICB2YXIgcG9pbnQgPSBbXHJcbiAgICBsaW5lcG9pbnRbMF0gKiB0ZXh0LndpZHRoICsgb2Zmc2V0eCxcclxuICAgIGxpbmVwb2ludFsxXSAqIHRleHQuaGVpZ2h0ICsgb2Zmc2V0eVxyXG4gIF07XHJcbiAgLy8gQWRkaW5nIGhhbGYgYSBsaW5lIGhlaWdodCBoZXJlIGlzIHRlY2huaWNhbGx5IGEgYnVnXHJcbiAgLy8gYnV0IHBjYm5ldyBjdXJyZW50bHkgZG9lcyB0aGUgc2FtZSwgdGV4dCBpcyBzbGlnaHRseSBzaGlmdGVkLlxyXG4gIHBvaW50WzBdIC09IChwb2ludFsxXSArIHRleHQuaGVpZ2h0ICogMC41KSAqIHRpbHQ7XHJcbiAgcmV0dXJuIHBvaW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3dGV4dChjdHgsIHRleHQsIGNvbG9yLCBmbGlwKSB7XHJcbiAgY3R4LnNhdmUoKTtcclxuICBjdHgudHJhbnNsYXRlKC4uLnRleHQucG9zKTtcclxuICB2YXIgYW5nbGUgPSAtdGV4dC5hbmdsZTtcclxuICBpZiAodGV4dC5hdHRyLmluY2x1ZGVzKFwibWlycm9yZWRcIikpIHtcclxuICAgIGN0eC5zY2FsZSgtMSwgMSk7XHJcbiAgICBhbmdsZSA9IC1hbmdsZTtcclxuICB9XHJcbiAgdmFyIHRpbHQgPSAwO1xyXG4gIGlmICh0ZXh0LmF0dHIuaW5jbHVkZXMoXCJpdGFsaWNcIikpIHtcclxuICAgIHRpbHQgPSAwLjEyNTtcclxuICB9XHJcbiAgdmFyIGludGVybGluZSA9ICh0ZXh0LmhlaWdodCAqIDEuNSArIHRleHQudGhpY2tuZXNzKSAvIDI7XHJcbiAgdmFyIHR4dCA9IHRleHQudGV4dC5zcGxpdChcIlxcblwiKTtcclxuICBjdHgucm90YXRlKGRlZzJyYWQoYW5nbGUpKTtcclxuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XHJcbiAgY3R4LmxpbmVXaWR0aCA9IHRleHQudGhpY2tuZXNzO1xyXG4gIGZvciAodmFyIGkgaW4gdHh0KSB7XHJcbiAgICB2YXIgb2Zmc2V0eSA9ICgtKHR4dC5sZW5ndGggLSAxKSArIGkgKiAyKSAqIGludGVybGluZSArIHRleHQuaGVpZ2h0IC8gMjtcclxuICAgIHZhciBsaW5lV2lkdGggPSAwO1xyXG4gICAgZm9yICh2YXIgYyBvZiB0eHRbaV0pIHtcclxuICAgICAgbGluZVdpZHRoICs9IHBjYmRhdGEuZm9udF9kYXRhW2NdLncgKiB0ZXh0LndpZHRoO1xyXG4gICAgfVxyXG4gICAgdmFyIG9mZnNldHggPSAwO1xyXG4gICAgc3dpdGNoICh0ZXh0Lmhvcml6X2p1c3RpZnkpIHtcclxuICAgICAgY2FzZSAtMTpcclxuICAgICAgICAvLyBKdXN0aWZ5IGxlZnQsIGRvIG5vdGhpbmdcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIC8vIEp1c3RpZnkgY2VudGVyXHJcbiAgICAgICAgb2Zmc2V0eCAtPSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgLy8gSnVzdGlmeSByaWdodFxyXG4gICAgICAgIG9mZnNldHggLT0gbGluZVdpZHRoO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgYyBvZiB0eHRbaV0pIHtcclxuICAgICAgZm9yICh2YXIgbGluZSBvZiBwY2JkYXRhLmZvbnRfZGF0YVtjXS5sKSB7XHJcbiAgICAgICAgLy8gRHJhd2luZyBlYWNoIHNlZ21lbnQgc2VwYXJhdGVseSBpbnN0ZWFkIG9mXHJcbiAgICAgICAgLy8gcG9seWxpbmUgYmVjYXVzZSByb3VuZCBsaW5lIGNhcHMgZG9uJ3Qgd29yayBpbiBqb2ludHNcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICBjdHgubW92ZVRvKC4uLmNhbGNGb250UG9pbnQobGluZVtpXSwgdGV4dCwgb2Zmc2V0eCwgb2Zmc2V0eSwgdGlsdCkpO1xyXG4gICAgICAgICAgY3R4LmxpbmVUbyguLi5jYWxjRm9udFBvaW50KGxpbmVbaSArIDFdLCB0ZXh0LCBvZmZzZXR4LCBvZmZzZXR5LCB0aWx0KSk7XHJcbiAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIG9mZnNldHggKz0gcGNiZGF0YS5mb250X2RhdGFbY10udyAqIHRleHQud2lkdGg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGN0eC5yZXN0b3JlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdlZGdlKGN0eCwgc2NhbGVmYWN0b3IsIGVkZ2UsIGNvbG9yKSB7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY3R4LmxpbmVXaWR0aCA9IE1hdGgubWF4KDEgLyBzY2FsZWZhY3RvciwgZWRnZS53aWR0aCk7XHJcbiAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XHJcbiAgaWYgKGVkZ2UudHlwZSA9PSBcInNlZ21lbnRcIikgXHJcbiAge1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4Lm1vdmVUbyguLi5lZGdlLnN0YXJ0KTtcclxuICAgIGN0eC5saW5lVG8oLi4uZWRnZS5lbmQpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gIH1cclxuICBpZiAoZWRnZS50eXBlID09IFwiYXJjXCIpIHtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIC4uLmVkZ2Uuc3RhcnQsXHJcbiAgICAgIGVkZ2UucmFkaXVzLFxyXG4gICAgICBkZWcycmFkKGVkZ2Uuc3RhcnRhbmdsZSksXHJcbiAgICAgIGRlZzJyYWQoZWRnZS5lbmRhbmdsZSkpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gIH1cclxuICBpZiAoZWRnZS50eXBlID09IFwiY2lyY2xlXCIpIHtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIC4uLmVkZ2Uuc3RhcnQsXHJcbiAgICAgIGVkZ2UucmFkaXVzLFxyXG4gICAgICAwLCAyICogTWF0aC5QSSk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3Um91bmRSZWN0KGN0eCwgY29sb3IsIHNpemUsIHJhZGl1cywgY3R4bWV0aG9kKSB7XHJcbiAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gIHZhciB4ID0gc2l6ZVswXSAqIC0wLjU7XHJcbiAgdmFyIHkgPSBzaXplWzFdICogLTAuNTtcclxuICB2YXIgd2lkdGggPSBzaXplWzBdO1xyXG4gIHZhciBoZWlnaHQgPSBzaXplWzFdO1xyXG4gIGN0eC5tb3ZlVG8oeCwgMCk7XHJcbiAgY3R4LmFyY1RvKHgsIHkgKyBoZWlnaHQsIHggKyB3aWR0aCwgeSArIGhlaWdodCwgcmFkaXVzKTtcclxuICBjdHguYXJjVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0LCB4ICsgd2lkdGgsIHksIHJhZGl1cyk7XHJcbiAgY3R4LmFyY1RvKHggKyB3aWR0aCwgeSwgeCwgeSwgcmFkaXVzKTtcclxuICBjdHguYXJjVG8oeCwgeSwgeCwgeSArIGhlaWdodCwgcmFkaXVzKTtcclxuICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgY3R4bWV0aG9kKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdPYmxvbmcoY3R4LCBjb2xvciwgc2l6ZSwgY3R4bWV0aG9kKSB7XHJcbiAgZHJhd1JvdW5kUmVjdChjdHgsIGNvbG9yLCBzaXplLCBNYXRoLm1pbihzaXplWzBdLCBzaXplWzFdKSAvIDIsIGN0eG1ldGhvZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdQb2x5Z29ucyhjdHgsIGNvbG9yLCBwb2x5Z29ucywgY3R4bWV0aG9kKSB7XHJcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gIGlmKHBvbHlnb25zLmxlbmd0aD4wKVxyXG4gIHtcclxuICAgIGZvciAodmFyIHBvbHlnb24gb2YgcG9seWdvbnMpIHtcclxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICBmb3IgKHZhciB2ZXJ0ZXggb2YgcG9seWdvbikge1xyXG4gICAgICAgIGN0eC5saW5lVG8oLi4udmVydGV4KVxyXG4gICAgICB9XHJcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgY3R4bWV0aG9kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UG9seWdvblNoYXBlKGN0eCwgc2hhcGUsIGNvbG9yKSB7XHJcbiAgY3R4LnNhdmUoKTtcclxuICBjdHgudHJhbnNsYXRlKC4uLnNoYXBlLnBvcyk7XHJcbiAgY3R4LnJvdGF0ZShkZWcycmFkKC1zaGFwZS5hbmdsZSkpO1xyXG4gIGRyYXdQb2x5Z29ucyhjdHgsIGNvbG9yLCBzaGFwZS5wb2x5Z29ucywgY3R4LmZpbGwuYmluZChjdHgpKTtcclxuICBjdHgucmVzdG9yZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3RHJhd2luZyhjdHgsIGxheWVyLCBzY2FsZWZhY3RvciwgZHJhd2luZywgY29sb3IpIHtcclxuICBpZiAoW1wic2VnbWVudFwiLCBcImFyY1wiLCBcImNpcmNsZVwiXS5pbmNsdWRlcyhkcmF3aW5nLnR5cGUpKSB7XHJcbiAgICBkcmF3ZWRnZShjdHgsIHNjYWxlZmFjdG9yLCBkcmF3aW5nLCBjb2xvcik7XHJcbiAgfSBlbHNlIGlmIChkcmF3aW5nLnR5cGUgPT0gXCJwb2x5Z29uXCIpIHtcclxuICAgIGRyYXdQb2x5Z29uU2hhcGUoY3R4LCBkcmF3aW5nLCBjb2xvcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRyYXd0ZXh0KGN0eCwgZHJhd2luZywgY29sb3IsIGxheWVyID09IFwiQlwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdDaXJjbGUoY3R4LCByYWRpdXMsIGN0eG1ldGhvZCkge1xyXG4gIGN0eC5iZWdpblBhdGgoKTtcclxuICBjdHguYXJjKDAsIDAsIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gIGN0eC5jbG9zZVBhdGgoKTtcclxuICBjdHhtZXRob2QoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1BhZChjdHgsIHBhZCwgY29sb3IsIG91dGxpbmUpIHtcclxuICBjdHguc2F2ZSgpO1xyXG4gIGN0eC50cmFuc2xhdGUoLi4ucGFkLnBvcyk7XHJcbiAgY3R4LnJvdGF0ZShkZWcycmFkKHBhZC5hbmdsZSkpO1xyXG4gIGlmIChwYWQub2Zmc2V0KSB7XHJcbiAgICBjdHgudHJhbnNsYXRlKC4uLnBhZC5vZmZzZXQpO1xyXG4gIH1cclxuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgdmFyIGN0eG1ldGhvZCA9IG91dGxpbmUgPyBjdHguc3Ryb2tlLmJpbmQoY3R4KSA6IGN0eC5maWxsLmJpbmQoY3R4KTtcclxuICBpZiAocGFkLnNoYXBlID09IFwicmVjdFwiKSB7XHJcbiAgICB2YXIgcmVjdCA9IFsuLi5wYWQuc2l6ZS5tYXAoYyA9PiAtYyAqIDAuNSksIC4uLnBhZC5zaXplXTtcclxuICAgIGlmIChvdXRsaW5lKSB7XHJcbiAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnJlY3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3R4LmZpbGxSZWN0KC4uLnJlY3QpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocGFkLnNoYXBlID09IFwib3ZhbFwiKSB7XHJcbiAgICBkcmF3T2Jsb25nKGN0eCwgY29sb3IsIHBhZC5zaXplLCBjdHhtZXRob2QpO1xyXG4gIH0gZWxzZSBpZiAocGFkLnNoYXBlID09IFwiY2lyY2xlXCIpIHtcclxuICAgIGRyYXdDaXJjbGUoY3R4LCBwYWQuc2l6ZVswXSAvIDIsIGN0eG1ldGhvZCk7XHJcbiAgfSBlbHNlIGlmIChwYWQuc2hhcGUgPT0gXCJyb3VuZHJlY3RcIikge1xyXG4gICAgZHJhd1JvdW5kUmVjdChjdHgsIGNvbG9yLCBwYWQuc2l6ZSwgcGFkLnJhZGl1cywgY3R4bWV0aG9kKTtcclxuICB9IGVsc2UgaWYgKHBhZC5zaGFwZSA9PSBcImN1c3RvbVwiKSB7XHJcbiAgICBkcmF3UG9seWdvbnMoY3R4LCBjb2xvciwgcGFkLnBvbHlnb25zLCBjdHhtZXRob2QpO1xyXG4gIH1cclxuICBpZiAocGFkLnR5cGUgPT0gXCJ0aFwiICYmICFvdXRsaW5lKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjQ0NDQ0NDXCI7XHJcbiAgICBpZiAocGFkLmRyaWxsc2hhcGUgPT0gXCJvYmxvbmdcIikge1xyXG4gICAgICBkcmF3T2Jsb25nKGN0eCwgXCIjQ0NDQ0NDXCIsIHBhZC5kcmlsbHNpemUsIGN0eG1ldGhvZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkcmF3Q2lyY2xlKGN0eCwgcGFkLmRyaWxsc2l6ZVswXSAvIDIsIGN0eG1ldGhvZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGN0eC5yZXN0b3JlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdNb2R1bGUoY3R4LCBsYXllciwgc2NhbGVmYWN0b3IsIG1vZHVsZSwgcGFkY29sb3IsIG91dGxpbmVjb2xvciwgaGlnaGxpZ2h0KSB7XHJcbiAgaWYgKGhpZ2hsaWdodCkge1xyXG4gICAgLy8gZHJhdyBib3VuZGluZyBib3hcclxuICAgIGlmIChtb2R1bGUubGF5ZXIgPT0gbGF5ZXIpIHtcclxuICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4yO1xyXG4gICAgICBjdHgudHJhbnNsYXRlKC4uLm1vZHVsZS5iYm94LnBvcyk7XHJcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBwYWRjb2xvcjtcclxuICAgICAgY3R4LmZpbGxSZWN0KFxyXG4gICAgICAgIDAsIDAsXHJcbiAgICAgICAgLi4ubW9kdWxlLmJib3guc2l6ZSk7XHJcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHBhZGNvbG9yO1xyXG4gICAgICBjdHguc3Ryb2tlUmVjdChcclxuICAgICAgICAwLCAwLFxyXG4gICAgICAgIC4uLm1vZHVsZS5iYm94LnNpemUpO1xyXG4gICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBkcmF3IGRyYXdpbmdzXHJcbiAgZm9yICh2YXIgZHJhd2luZyBvZiBtb2R1bGUuZHJhd2luZ3MpIHtcclxuICAgIGlmIChkcmF3aW5nLmxheWVyID09IGxheWVyKSB7XHJcbiAgICAgIGRyYXdEcmF3aW5nKGN0eCwgbGF5ZXIsIHNjYWxlZmFjdG9yLCBkcmF3aW5nLmRyYXdpbmcsIHBhZGNvbG9yKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gZHJhdyBwYWRzXHJcbiAgZm9yICh2YXIgcGFkIG9mIG1vZHVsZS5wYWRzKSB7XHJcbiAgICBpZiAocGFkLmxheWVycy5pbmNsdWRlcyhsYXllcikpIHtcclxuICAgICAgZHJhd1BhZChjdHgsIHBhZCwgcGFkY29sb3IsIGZhbHNlKTtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICBpZiAocGFkLnBpbjEgJiYgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRQaW4xKCkpIFxyXG4gICAgICB7XHJcbiAgICAgICAgZHJhd1BhZChjdHgsIHBhZCwgb3V0bGluZWNvbG9yLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0VkZ2VzKGNhbnZhcywgc2NhbGVmYWN0b3IpIHtcclxuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICB2YXIgZWRnZWNvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0b3Btb3N0ZGl2KS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBjYi1lZGdlLWNvbG9yJyk7XHJcbiAgZm9yICh2YXIgZWRnZSBvZiBwY2JkYXRhLmVkZ2VzKSB7XHJcbiAgICBkcmF3ZWRnZShjdHgsIHNjYWxlZmFjdG9yLCBlZGdlLCBlZGdlY29sb3IpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd01vZHVsZXMoY2FudmFzLCBsYXllciwgc2NhbGVmYWN0b3IsIGhpZ2hsaWdodGVkUmVmcykge1xyXG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIGN0eC5saW5lV2lkdGggPSAzIC8gc2NhbGVmYWN0b3I7XHJcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0b3Btb3N0ZGl2KTtcclxuICB2YXIgcGFkY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhZC1jb2xvcicpO1xyXG4gIHZhciBvdXRsaW5lY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBpbjEtb3V0bGluZS1jb2xvcicpO1xyXG4gIGlmIChoaWdobGlnaHRlZFJlZnMubGVuZ3RoID4gMCkge1xyXG4gICAgcGFkY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhZC1jb2xvci1oaWdobGlnaHQnKTtcclxuICAgIG91dGxpbmVjb2xvciA9IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJy0tcGluMS1vdXRsaW5lLWNvbG9yLWhpZ2hsaWdodCcpO1xyXG4gIH1cclxuICBmb3IgKHZhciBpIGluIHBjYmRhdGEubW9kdWxlcykge1xyXG4gICAgdmFyIG1vZCA9IHBjYmRhdGEubW9kdWxlc1tpXTtcclxuICAgIHZhciBoaWdobGlnaHQgPSBoaWdobGlnaHRlZFJlZnMuaW5jbHVkZXMobW9kLnJlZik7XHJcbiAgICBpZiAoaGlnaGxpZ2h0ZWRSZWZzLmxlbmd0aCA9PSAwIHx8IGhpZ2hsaWdodCkge1xyXG4gICAgICBkcmF3TW9kdWxlKGN0eCwgbGF5ZXIsIHNjYWxlZmFjdG9yLCBtb2QsIHBhZGNvbG9yLCBvdXRsaW5lY29sb3IsIGhpZ2hsaWdodCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3U2lsa3NjcmVlbihjYW52YXMsIGxheWVyLCBzY2FsZWZhY3Rvcilcclxue1xyXG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIGZvciAodmFyIGQgb2YgcGNiZGF0YS5zaWxrc2NyZWVuW2xheWVyXSlcclxuICB7XHJcbiAgICBpZiAoW1wic2VnbWVudFwiLCBcImFyY1wiLCBcImNpcmNsZVwiXS5pbmNsdWRlcyhkLnR5cGUpKVxyXG4gICAge1xyXG4gICAgICBkcmF3ZWRnZShjdHgsIHNjYWxlZmFjdG9yLCBkLCBcIiNhYTRcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkLnR5cGUgPT0gXCJwb2x5Z29uXCIpXHJcbiAgICB7XHJcbiAgICAgIGRyYXdQb2x5Z29uU2hhcGUoY3R4LCBkLCBcIiM0YWFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGRyYXd0ZXh0KGN0eCwgZCwgXCIjNGFhXCIsIGxheWVyID09IFwiQlwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyQ2FudmFzKGNhbnZhcykge1xyXG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIGN0eC5zYXZlKCk7XHJcbiAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcclxuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgY3R4LnJlc3RvcmUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0hpZ2hsaWdodHNPbkxheWVyKGNhbnZhc2RpY3QpIHtcclxuICBjbGVhckNhbnZhcyhjYW52YXNkaWN0LmhpZ2hsaWdodCk7XHJcbiAgZHJhd01vZHVsZXMoY2FudmFzZGljdC5oaWdobGlnaHQsIGNhbnZhc2RpY3QubGF5ZXIsXHJcbiAgICBjYW52YXNkaWN0LnRyYW5zZm9ybS5zLCBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodGVkUmVmcygpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0hpZ2hsaWdodHMoKSB7XHJcbiAgZHJhd0hpZ2hsaWdodHNPbkxheWVyKGFsbGNhbnZhcy5mcm9udCk7XHJcbiAgZHJhd0hpZ2hsaWdodHNPbkxheWVyKGFsbGNhbnZhcy5iYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0JhY2tncm91bmQoY2FudmFzZGljdCkge1xyXG4gIGNsZWFyQ2FudmFzKGNhbnZhc2RpY3QuYmcpO1xyXG4gIGNsZWFyQ2FudmFzKGNhbnZhc2RpY3Quc2lsayk7XHJcbiAgZHJhd0VkZ2VzKGNhbnZhc2RpY3QuYmcsIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMpO1xyXG4gIGRyYXdNb2R1bGVzKGNhbnZhc2RpY3QuYmcsIGNhbnZhc2RpY3QubGF5ZXIsIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMsIFtdKTtcclxuICBkcmF3U2lsa3NjcmVlbihjYW52YXNkaWN0LnNpbGssIGNhbnZhc2RpY3QubGF5ZXIsIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlQ2FudmFzKGNhbnZhcywgZmxpcCwgdHJhbnNmb3JtKSB7XHJcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcclxuICB2YXIgZm9udHNpemUgPSAxLjU1O1xyXG4gIGN0eC5zY2FsZSh0cmFuc2Zvcm0uem9vbSwgdHJhbnNmb3JtLnpvb20pO1xyXG4gIGN0eC50cmFuc2xhdGUodHJhbnNmb3JtLnBhbngsIHRyYW5zZm9ybS5wYW55KTtcclxuICBpZiAoZmxpcCkge1xyXG4gICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICB9XHJcbiAgY3R4LnRyYW5zbGF0ZSh0cmFuc2Zvcm0ueCwgdHJhbnNmb3JtLnkpO1xyXG4gIGN0eC5yb3RhdGUoZGVnMnJhZChib2FyZFJvdGF0aW9uKSk7XHJcbiAgY3R4LnNjYWxlKHRyYW5zZm9ybS5zLCB0cmFuc2Zvcm0ucyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVMYXllcihjYW52YXNkaWN0KSB7XHJcbiAgdmFyIGZsaXAgPSAoY2FudmFzZGljdC5sYXllciAhPSBcIkJcIik7XHJcbiAgZm9yICh2YXIgYyBvZiBbXCJiZ1wiLCBcInNpbGtcIiwgXCJoaWdobGlnaHRcIl0pIHtcclxuICAgIHByZXBhcmVDYW52YXMoY2FudmFzZGljdFtjXSwgZmxpcCwgY2FudmFzZGljdC50cmFuc2Zvcm0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcm90YXRlVmVjdG9yKHYsIGFuZ2xlKSB7XHJcbiAgYW5nbGUgPSBkZWcycmFkKGFuZ2xlKTtcclxuICByZXR1cm4gW1xyXG4gICAgdlswXSAqIE1hdGguY29zKGFuZ2xlKSAtIHZbMV0gKiBNYXRoLnNpbihhbmdsZSksXHJcbiAgICB2WzBdICogTWF0aC5zaW4oYW5nbGUpICsgdlsxXSAqIE1hdGguY29zKGFuZ2xlKVxyXG4gIF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5Um90YXRpb24oYmJveCkge1xyXG4gIHZhciBjb3JuZXJzID0gW1xyXG4gICAgW2Jib3gubWlueCwgYmJveC5taW55XSxcclxuICAgIFtiYm94Lm1pbngsIGJib3gubWF4eV0sXHJcbiAgICBbYmJveC5tYXh4LCBiYm94Lm1pbnldLFxyXG4gICAgW2Jib3gubWF4eCwgYmJveC5tYXh5XSxcclxuICBdO1xyXG4gIGNvcm5lcnMgPSBjb3JuZXJzLm1hcCgodikgPT4gcm90YXRlVmVjdG9yKHYsIGJvYXJkUm90YXRpb24pKTtcclxuICByZXR1cm4ge1xyXG4gICAgbWlueDogY29ybmVycy5yZWR1Y2UoKGEsIHYpID0+IE1hdGgubWluKGEsIHZbMF0pLCBJbmZpbml0eSksXHJcbiAgICBtaW55OiBjb3JuZXJzLnJlZHVjZSgoYSwgdikgPT4gTWF0aC5taW4oYSwgdlsxXSksIEluZmluaXR5KSxcclxuICAgIG1heHg6IGNvcm5lcnMucmVkdWNlKChhLCB2KSA9PiBNYXRoLm1heChhLCB2WzBdKSwgLUluZmluaXR5KSxcclxuICAgIG1heHk6IGNvcm5lcnMucmVkdWNlKChhLCB2KSA9PiBNYXRoLm1heChhLCB2WzFdKSwgLUluZmluaXR5KSxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlY2FsY0xheWVyU2NhbGUoY2FudmFzZGljdCkge1xyXG4gIHZhciBjYW52YXNkaXZpZCA9IHtcclxuICAgIFwiRlwiOiBcImZyb250Y2FudmFzXCIsXHJcbiAgICBcIkJcIjogXCJiYWNrY2FudmFzXCJcclxuICB9IFtjYW52YXNkaWN0LmxheWVyXTtcclxuICB2YXIgd2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNkaXZpZCkuY2xpZW50V2lkdGggKiAyO1xyXG4gIHZhciBoZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNkaXZpZCkuY2xpZW50SGVpZ2h0ICogMjtcclxuICB2YXIgYmJveCA9IGFwcGx5Um90YXRpb24ocGNiZGF0YS5lZGdlc19iYm94KTtcclxuICB2YXIgc2NhbGVmYWN0b3IgPSAwLjk4ICogTWF0aC5taW4oXHJcbiAgICB3aWR0aCAvIChiYm94Lm1heHggLSBiYm94Lm1pbngpLFxyXG4gICAgaGVpZ2h0IC8gKGJib3gubWF4eSAtIGJib3gubWlueSlcclxuICApO1xyXG4gIGlmIChzY2FsZWZhY3RvciA8IDAuMSkge1xyXG4gICAgc2NhbGVmYWN0b3IgPSAxO1xyXG4gIH1cclxuICBjYW52YXNkaWN0LnRyYW5zZm9ybS5zID0gc2NhbGVmYWN0b3I7XHJcbiAgdmFyIGZsaXAgPSAoY2FudmFzZGljdC5sYXllciAhPSBcIkJcIik7XHJcbiAgaWYgKGZsaXApIHtcclxuICAgIGNhbnZhc2RpY3QudHJhbnNmb3JtLnggPSAtKChiYm94Lm1heHggKyBiYm94Lm1pbngpICogc2NhbGVmYWN0b3IgKyB3aWR0aCkgKiAwLjU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNhbnZhc2RpY3QudHJhbnNmb3JtLnggPSAtKChiYm94Lm1heHggKyBiYm94Lm1pbngpICogc2NhbGVmYWN0b3IgLSB3aWR0aCkgKiAwLjU7XHJcbiAgfVxyXG4gIGNhbnZhc2RpY3QudHJhbnNmb3JtLnkgPSAtKChiYm94Lm1heHkgKyBiYm94Lm1pbnkpICogc2NhbGVmYWN0b3IgLSBoZWlnaHQpICogMC41O1xyXG4gIGZvciAodmFyIGMgb2YgW1wiYmdcIiwgXCJzaWxrXCIsIFwiaGlnaGxpZ2h0XCJdKSB7XHJcbiAgICBjYW52YXMgPSBjYW52YXNkaWN0W2NdO1xyXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gKHdpZHRoIC8gMikgKyBcInB4XCI7XHJcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gKGhlaWdodCAvIDIpICsgXCJweFwiO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyhcIlNjYWxlIGZhY3RvciBcIiArIGNhbnZhc2RpdmlkICsgXCI6IFwiLCBjYW52YXNkaWN0LnRyYW5zZm9ybSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpIHtcclxuICBwcmVwYXJlTGF5ZXIobGF5ZXJkaWN0KTtcclxuICBkcmF3QmFja2dyb3VuZChsYXllcmRpY3QpO1xyXG4gIGRyYXdIaWdobGlnaHRzT25MYXllcihsYXllcmRpY3QpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNpemVDYW52YXMobGF5ZXJkaWN0KSB7XHJcbiAgcmVjYWxjTGF5ZXJTY2FsZShsYXllcmRpY3QpO1xyXG4gIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNpemVBbGwoKSB7XHJcbiAgcmVzaXplQ2FudmFzKGFsbGNhbnZhcy5mcm9udCk7XHJcbiAgcmVzaXplQ2FudmFzKGFsbGNhbnZhcy5iYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYmJveFNjYW4obGF5ZXIsIHgsIHkpIHtcclxuICB2YXIgcmVzdWx0ID0gW107XHJcbiAgZm9yICh2YXIgaSBpbiBwY2JkYXRhLm1vZHVsZXMpIHtcclxuICAgIHZhciBtb2R1bGUgPSBwY2JkYXRhLm1vZHVsZXNbaV07XHJcbiAgICBpZiAobW9kdWxlLmxheWVyID09IGxheWVyKSB7XHJcbiAgICAgIHZhciBiID0gbW9kdWxlLmJib3g7XHJcbiAgICAgIGlmIChiLnBvc1swXSA8PSB4ICYmIGIucG9zWzBdICsgYi5zaXplWzBdID49IHggJiZcclxuICAgICAgICBiLnBvc1sxXSA8PSB5ICYmIGIucG9zWzFdICsgYi5zaXplWzFdID49IHkpIHtcclxuICAgICAgICByZXN1bHQucHVzaChtb2R1bGUucmVmKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSwgbGF5ZXJkaWN0KSB7XHJcbiAgaWYgKGUud2hpY2ggIT0gMSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR4ID0gZS5vZmZzZXRYO1xyXG4gIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2VzdGFydHkgPSBlLm9mZnNldFk7XHJcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd254ID0gZS5vZmZzZXRYO1xyXG4gIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3dueSA9IGUub2Zmc2V0WTtcclxuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93biA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU1vdXNlQ2xpY2soZSwgbGF5ZXJkaWN0KSB7XHJcbiAgdmFyIHggPSBlLm9mZnNldFg7XHJcbiAgdmFyIHkgPSBlLm9mZnNldFk7XHJcbiAgdmFyIHQgPSBsYXllcmRpY3QudHJhbnNmb3JtO1xyXG4gIGlmIChsYXllcmRpY3QubGF5ZXIgPT0gXCJCXCIpIHtcclxuICAgIHggPSAoMiAqIHggLyB0Lnpvb20gLSB0LnBhbnggKyB0LngpIC8gLXQucztcclxuICB9IGVsc2Uge1xyXG4gICAgeCA9ICgyICogeCAvIHQuem9vbSAtIHQucGFueCAtIHQueCkgLyB0LnM7XHJcbiAgfVxyXG4gIHkgPSAoMiAqIHkgLyB0Lnpvb20gLSB0LnkgLSB0LnBhbnkpIC8gdC5zO1xyXG4gIHZhciB2ID0gcm90YXRlVmVjdG9yKFt4LCB5XSwgLWJvYXJkUm90YXRpb24pO1xyXG4gIHZhciByZWZsaXN0ID0gYmJveFNjYW4obGF5ZXJkaWN0LmxheWVyLCB2WzBdLCB2WzFdKTtcclxuICBpZiAocmVmbGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICBtb2R1bGVzQ2xpY2tlZChyZWZsaXN0KTtcclxuICAgIGRyYXdIaWdobGlnaHRzKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNb3VzZVVwKGUsIGxheWVyZGljdCkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIGlmIChlLndoaWNoID09IDEgJiZcclxuICAgIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duICYmXHJcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93bnggPT0gZS5vZmZzZXRYICYmXHJcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93bnkgPT0gZS5vZmZzZXRZKSB7XHJcbiAgICAvLyBUaGlzIGlzIGp1c3QgYSBjbGlja1xyXG4gICAgaGFuZGxlTW91c2VDbGljayhlLCBsYXllcmRpY3QpO1xyXG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd24gPSBmYWxzZTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgaWYgKGUud2hpY2ggPT0gMykge1xyXG4gICAgLy8gUmVzZXQgcGFuIGFuZCB6b29tIG9uIHJpZ2h0IGNsaWNrLlxyXG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5wYW54ID0gMDtcclxuICAgIGxheWVyZGljdC50cmFuc2Zvcm0ucGFueSA9IDA7XHJcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLnpvb20gPSAxO1xyXG4gICAgcmVkcmF3Q2FudmFzKGxheWVyZGljdCk7XHJcbiAgfSBlbHNlIGlmICghZ2xvYmFsRGF0YS5nZXRSZWRyYXdPbkRyYWcoKSkge1xyXG4gICAgcmVkcmF3Q2FudmFzKGxheWVyZGljdCk7XHJcbiAgfVxyXG4gIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duID0gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU1vdXNlTW92ZShlLCBsYXllcmRpY3QpIHtcclxuICBpZiAoIWxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIHZhciBkeCA9IGUub2Zmc2V0WCAtIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2VzdGFydHg7XHJcbiAgdmFyIGR5ID0gZS5vZmZzZXRZIC0gbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eTtcclxuICBsYXllcmRpY3QudHJhbnNmb3JtLnBhbnggKz0gMiAqIGR4IC8gbGF5ZXJkaWN0LnRyYW5zZm9ybS56b29tO1xyXG4gIGxheWVyZGljdC50cmFuc2Zvcm0ucGFueSArPSAyICogZHkgLyBsYXllcmRpY3QudHJhbnNmb3JtLnpvb207XHJcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eCA9IGUub2Zmc2V0WDtcclxuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR5ID0gZS5vZmZzZXRZO1xyXG4gIGlmIChnbG9iYWxEYXRhLmdldFJlZHJhd09uRHJhZygpKSB7XHJcbiAgICByZWRyYXdDYW52YXMobGF5ZXJkaWN0KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU1vdXNlV2hlZWwoZSwgbGF5ZXJkaWN0KSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgdmFyIHQgPSBsYXllcmRpY3QudHJhbnNmb3JtO1xyXG4gIHZhciB3aGVlbGRlbHRhID0gZS5kZWx0YVk7XHJcbiAgaWYgKGUuZGVsdGFNb2RlID09IDEpIHtcclxuICAgIC8vIEZGIG9ubHksIHNjcm9sbCBieSBsaW5lc1xyXG4gICAgd2hlZWxkZWx0YSAqPSAzMDtcclxuICB9IGVsc2UgaWYgKGUuZGVsdGFNb2RlID09IDIpIHtcclxuICAgIHdoZWVsZGVsdGEgKj0gMzAwO1xyXG4gIH1cclxuICB2YXIgbSA9IE1hdGgucG93KDEuMSwgLXdoZWVsZGVsdGEgLyA0MCk7XHJcbiAgLy8gTGltaXQgYW1vdW50IG9mIHpvb20gcGVyIHRpY2suXHJcbiAgaWYgKG0gPiAyKSB7XHJcbiAgICBtID0gMjtcclxuICB9IGVsc2UgaWYgKG0gPCAwLjUpIHtcclxuICAgIG0gPSAwLjU7XHJcbiAgfVxyXG4gIHQuem9vbSAqPSBtO1xyXG4gIHZhciB6b29tZCA9ICgxIC0gbSkgLyB0Lnpvb207XHJcbiAgdC5wYW54ICs9IDIgKiBlLm9mZnNldFggKiB6b29tZDtcclxuICB0LnBhbnkgKz0gMiAqIGUub2Zmc2V0WSAqIHpvb21kO1xyXG4gIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpO1xyXG4gIGNvbnNvbGUubG9nKGxheWVyZGljdC50cmFuc2Zvcm0uem9vbSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE1vdXNlSGFuZGxlcnMoZGl2LCBsYXllcmRpY3QpIHtcclxuICBkaXYub25tb3VzZWRvd24gPSBmdW5jdGlvbihlKSB7XHJcbiAgICBoYW5kbGVNb3VzZURvd24oZSwgbGF5ZXJkaWN0KTtcclxuICB9O1xyXG4gIGRpdi5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGhhbmRsZU1vdXNlTW92ZShlLCBsYXllcmRpY3QpO1xyXG4gIH07XHJcbiAgZGl2Lm9ubW91c2V1cCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGhhbmRsZU1vdXNlVXAoZSwgbGF5ZXJkaWN0KTtcclxuICB9O1xyXG4gIGRpdi5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgaGFuZGxlTW91c2VVcChlLCBsYXllcmRpY3QpO1xyXG4gIH1cclxuICBkaXYub253aGVlbCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGhhbmRsZU1vdXNlV2hlZWwoZSwgbGF5ZXJkaWN0KTtcclxuICB9XHJcbiAgZm9yICh2YXIgZWxlbWVudCBvZiBbZGl2LCBsYXllcmRpY3QuYmcsIGxheWVyZGljdC5zaWxrLCBsYXllcmRpY3QuaGlnaGxpZ2h0XSkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9LCBmYWxzZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRCb2FyZFJvdGF0aW9uKHZhbHVlKSB7XHJcbiAgYm9hcmRSb3RhdGlvbiA9IHZhbHVlICogNTtcclxuICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcImJvYXJkUm90YXRpb25cIiwgYm9hcmRSb3RhdGlvbik7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGlvbkRlZ3JlZVwiKS50ZXh0Q29udGVudCA9IGJvYXJkUm90YXRpb247XHJcbiAgcmVzaXplQWxsKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRSZW5kZXIoKSB7XHJcbiAgYWxsY2FudmFzID0ge1xyXG4gICAgZnJvbnQ6IHtcclxuICAgICAgdHJhbnNmb3JtOiB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwLFxyXG4gICAgICAgIHM6IDEsXHJcbiAgICAgICAgcGFueDogMCxcclxuICAgICAgICBwYW55OiAwLFxyXG4gICAgICAgIHpvb206IDEsXHJcbiAgICAgICAgbW91c2VzdGFydHg6IDAsXHJcbiAgICAgICAgbW91c2VzdGFydHk6IDAsXHJcbiAgICAgICAgbW91c2Vkb3duOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgYmc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRl9iZ1wiKSxcclxuICAgICAgc2lsazogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJGX3Nsa1wiKSxcclxuICAgICAgaGlnaGxpZ2h0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkZfaGxcIiksXHJcbiAgICAgIGxheWVyOiBcIkZcIixcclxuICAgIH0sXHJcbiAgICBiYWNrOiB7XHJcbiAgICAgIHRyYW5zZm9ybToge1xyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMCxcclxuICAgICAgICBzOiAxLFxyXG4gICAgICAgIHBhbng6IDAsXHJcbiAgICAgICAgcGFueTogMCxcclxuICAgICAgICB6b29tOiAxLFxyXG4gICAgICAgIG1vdXNlc3RhcnR4OiAwLFxyXG4gICAgICAgIG1vdXNlc3RhcnR5OiAwLFxyXG4gICAgICAgIG1vdXNlZG93bjogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkJfYmdcIiksXHJcbiAgICAgIHNpbGs6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQl9zbGtcIiksXHJcbiAgICAgIGhpZ2hsaWdodDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJCX2hsXCIpLFxyXG4gICAgICBsYXllcjogXCJCXCIsXHJcbiAgICB9XHJcbiAgfTtcclxuICBhZGRNb3VzZUhhbmRsZXJzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIiksIGFsbGNhbnZhcy5mcm9udCk7XHJcbiAgYWRkTW91c2VIYW5kbGVycyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIiksIGFsbGNhbnZhcy5iYWNrKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcmVzaXplQWxsLFxyXG4gIGluaXRSZW5kZXIsXHJcbiAgcmVkcmF3Q2FudmFzLFxyXG4gIGRyYXdIaWdobGlnaHRzLFxyXG4gIHNldEJvYXJkUm90YXRpb25cclxufTsiLCIvKlxuICBTcGxpdC5qcyAtIHYxLjMuNVxuICBNSVQgTGljZW5zZVxuICBodHRwczovL2dpdGh1Yi5jb20vbmF0aGFuY2FoaWxsL1NwbGl0LmpzXG4qL1xuIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6ZS5TcGxpdD10KCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT13aW5kb3csdD1lLmRvY3VtZW50LG49XCJhZGRFdmVudExpc3RlbmVyXCIsaT1cInJlbW92ZUV2ZW50TGlzdGVuZXJcIixyPVwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0XCIscz1mdW5jdGlvbigpe3JldHVybiExfSxvPWUuYXR0YWNoRXZlbnQmJiFlW25dLGE9W1wiXCIsXCItd2Via2l0LVwiLFwiLW1vei1cIixcIi1vLVwiXS5maWx0ZXIoZnVuY3Rpb24oZSl7dmFyIG49dC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBuLnN0eWxlLmNzc1RleHQ9XCJ3aWR0aDpcIitlK1wiY2FsYyg5cHgpXCIsISFuLnN0eWxlLmxlbmd0aH0pLnNoaWZ0KCkrXCJjYWxjXCIsbD1mdW5jdGlvbihlKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZXx8ZSBpbnN0YW5jZW9mIFN0cmluZz90LnF1ZXJ5U2VsZWN0b3IoZSk6ZX07cmV0dXJuIGZ1bmN0aW9uKHUsYyl7ZnVuY3Rpb24geihlLHQsbil7dmFyIGk9QSh5LHQsbik7T2JqZWN0LmtleXMoaSkuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZS5zdHlsZVt0XT1pW3RdfSl9ZnVuY3Rpb24gaChlLHQpe3ZhciBuPUIoeSx0KTtPYmplY3Qua2V5cyhuKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLnN0eWxlW3RdPW5bdF19KX1mdW5jdGlvbiBmKGUpe3ZhciB0PUVbdGhpcy5hXSxuPUVbdGhpcy5iXSxpPXQuc2l6ZStuLnNpemU7dC5zaXplPWUvdGhpcy5zaXplKmksbi5zaXplPWktZS90aGlzLnNpemUqaSx6KHQuZWxlbWVudCx0LnNpemUsdGhpcy5hR3V0dGVyU2l6ZSkseihuLmVsZW1lbnQsbi5zaXplLHRoaXMuYkd1dHRlclNpemUpfWZ1bmN0aW9uIG0oZSl7dmFyIHQ7dGhpcy5kcmFnZ2luZyYmKCh0PVwidG91Y2hlc1wiaW4gZT9lLnRvdWNoZXNbMF1bYl0tdGhpcy5zdGFydDplW2JdLXRoaXMuc3RhcnQpPD1FW3RoaXMuYV0ubWluU2l6ZStNK3RoaXMuYUd1dHRlclNpemU/dD1FW3RoaXMuYV0ubWluU2l6ZSt0aGlzLmFHdXR0ZXJTaXplOnQ+PXRoaXMuc2l6ZS0oRVt0aGlzLmJdLm1pblNpemUrTSt0aGlzLmJHdXR0ZXJTaXplKSYmKHQ9dGhpcy5zaXplLShFW3RoaXMuYl0ubWluU2l6ZSt0aGlzLmJHdXR0ZXJTaXplKSksZi5jYWxsKHRoaXMsdCksYy5vbkRyYWcmJmMub25EcmFnKCkpfWZ1bmN0aW9uIGcoKXt2YXIgZT1FW3RoaXMuYV0uZWxlbWVudCx0PUVbdGhpcy5iXS5lbGVtZW50O3RoaXMuc2l6ZT1lW3JdKClbeV0rdFtyXSgpW3ldK3RoaXMuYUd1dHRlclNpemUrdGhpcy5iR3V0dGVyU2l6ZSx0aGlzLnN0YXJ0PWVbcl0oKVtHXX1mdW5jdGlvbiBkKCl7dmFyIHQ9dGhpcyxuPUVbdC5hXS5lbGVtZW50LHI9RVt0LmJdLmVsZW1lbnQ7dC5kcmFnZ2luZyYmYy5vbkRyYWdFbmQmJmMub25EcmFnRW5kKCksdC5kcmFnZ2luZz0hMSxlW2ldKFwibW91c2V1cFwiLHQuc3RvcCksZVtpXShcInRvdWNoZW5kXCIsdC5zdG9wKSxlW2ldKFwidG91Y2hjYW5jZWxcIix0LnN0b3ApLHQucGFyZW50W2ldKFwibW91c2Vtb3ZlXCIsdC5tb3ZlKSx0LnBhcmVudFtpXShcInRvdWNobW92ZVwiLHQubW92ZSksZGVsZXRlIHQuc3RvcCxkZWxldGUgdC5tb3ZlLG5baV0oXCJzZWxlY3RzdGFydFwiLHMpLG5baV0oXCJkcmFnc3RhcnRcIixzKSxyW2ldKFwic2VsZWN0c3RhcnRcIixzKSxyW2ldKFwiZHJhZ3N0YXJ0XCIscyksbi5zdHlsZS51c2VyU2VsZWN0PVwiXCIsbi5zdHlsZS53ZWJraXRVc2VyU2VsZWN0PVwiXCIsbi5zdHlsZS5Nb3pVc2VyU2VsZWN0PVwiXCIsbi5zdHlsZS5wb2ludGVyRXZlbnRzPVwiXCIsci5zdHlsZS51c2VyU2VsZWN0PVwiXCIsci5zdHlsZS53ZWJraXRVc2VyU2VsZWN0PVwiXCIsci5zdHlsZS5Nb3pVc2VyU2VsZWN0PVwiXCIsci5zdHlsZS5wb2ludGVyRXZlbnRzPVwiXCIsdC5ndXR0ZXIuc3R5bGUuY3Vyc29yPVwiXCIsdC5wYXJlbnQuc3R5bGUuY3Vyc29yPVwiXCJ9ZnVuY3Rpb24gUyh0KXt2YXIgaT10aGlzLHI9RVtpLmFdLmVsZW1lbnQsbz1FW2kuYl0uZWxlbWVudDshaS5kcmFnZ2luZyYmYy5vbkRyYWdTdGFydCYmYy5vbkRyYWdTdGFydCgpLHQucHJldmVudERlZmF1bHQoKSxpLmRyYWdnaW5nPSEwLGkubW92ZT1tLmJpbmQoaSksaS5zdG9wPWQuYmluZChpKSxlW25dKFwibW91c2V1cFwiLGkuc3RvcCksZVtuXShcInRvdWNoZW5kXCIsaS5zdG9wKSxlW25dKFwidG91Y2hjYW5jZWxcIixpLnN0b3ApLGkucGFyZW50W25dKFwibW91c2Vtb3ZlXCIsaS5tb3ZlKSxpLnBhcmVudFtuXShcInRvdWNobW92ZVwiLGkubW92ZSkscltuXShcInNlbGVjdHN0YXJ0XCIscykscltuXShcImRyYWdzdGFydFwiLHMpLG9bbl0oXCJzZWxlY3RzdGFydFwiLHMpLG9bbl0oXCJkcmFnc3RhcnRcIixzKSxyLnN0eWxlLnVzZXJTZWxlY3Q9XCJub25lXCIsci5zdHlsZS53ZWJraXRVc2VyU2VsZWN0PVwibm9uZVwiLHIuc3R5bGUuTW96VXNlclNlbGVjdD1cIm5vbmVcIixyLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsby5zdHlsZS51c2VyU2VsZWN0PVwibm9uZVwiLG8uc3R5bGUud2Via2l0VXNlclNlbGVjdD1cIm5vbmVcIixvLnN0eWxlLk1velVzZXJTZWxlY3Q9XCJub25lXCIsby5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwiLGkuZ3V0dGVyLnN0eWxlLmN1cnNvcj1qLGkucGFyZW50LnN0eWxlLmN1cnNvcj1qLGcuY2FsbChpKX1mdW5jdGlvbiB2KGUpe2UuZm9yRWFjaChmdW5jdGlvbih0LG4pe2lmKG4+MCl7dmFyIGk9RltuLTFdLHI9RVtpLmFdLHM9RVtpLmJdO3Iuc2l6ZT1lW24tMV0scy5zaXplPXQseihyLmVsZW1lbnQsci5zaXplLGkuYUd1dHRlclNpemUpLHoocy5lbGVtZW50LHMuc2l6ZSxpLmJHdXR0ZXJTaXplKX19KX1mdW5jdGlvbiBwKCl7Ri5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UucGFyZW50LnJlbW92ZUNoaWxkKGUuZ3V0dGVyKSxFW2UuYV0uZWxlbWVudC5zdHlsZVt5XT1cIlwiLEVbZS5iXS5lbGVtZW50LnN0eWxlW3ldPVwiXCJ9KX12b2lkIDA9PT1jJiYoYz17fSk7dmFyIHksYixHLEUsdz1sKHVbMF0pLnBhcmVudE5vZGUsRD1lLmdldENvbXB1dGVkU3R5bGUodykuZmxleERpcmVjdGlvbixVPWMuc2l6ZXN8fHUubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIDEwMC91Lmxlbmd0aH0pLGs9dm9pZCAwIT09Yy5taW5TaXplP2MubWluU2l6ZToxMDAseD1BcnJheS5pc0FycmF5KGspP2s6dS5tYXAoZnVuY3Rpb24oKXtyZXR1cm4ga30pLEw9dm9pZCAwIT09Yy5ndXR0ZXJTaXplP2MuZ3V0dGVyU2l6ZToxMCxNPXZvaWQgMCE9PWMuc25hcE9mZnNldD9jLnNuYXBPZmZzZXQ6MzAsTz1jLmRpcmVjdGlvbnx8XCJob3Jpem9udGFsXCIsaj1jLmN1cnNvcnx8KFwiaG9yaXpvbnRhbFwiPT09Tz9cImV3LXJlc2l6ZVwiOlwibnMtcmVzaXplXCIpLEM9Yy5ndXR0ZXJ8fGZ1bmN0aW9uKGUsbil7dmFyIGk9dC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBpLmNsYXNzTmFtZT1cImd1dHRlciBndXR0ZXItXCIrbixpfSxBPWMuZWxlbWVudFN0eWxlfHxmdW5jdGlvbihlLHQsbil7dmFyIGk9e307cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHR8fHQgaW5zdGFuY2VvZiBTdHJpbmc/aVtlXT10OmlbZV09bz90K1wiJVwiOmErXCIoXCIrdCtcIiUgLSBcIituK1wicHgpXCIsaX0sQj1jLmd1dHRlclN0eWxlfHxmdW5jdGlvbihlLHQpe3JldHVybiBuPXt9LG5bZV09dCtcInB4XCIsbjt2YXIgbn07XCJob3Jpem9udGFsXCI9PT1PPyh5PVwid2lkdGhcIixcImNsaWVudFdpZHRoXCIsYj1cImNsaWVudFhcIixHPVwibGVmdFwiLFwicGFkZGluZ0xlZnRcIik6XCJ2ZXJ0aWNhbFwiPT09TyYmKHk9XCJoZWlnaHRcIixcImNsaWVudEhlaWdodFwiLGI9XCJjbGllbnRZXCIsRz1cInRvcFwiLFwicGFkZGluZ1RvcFwiKTt2YXIgRj1bXTtyZXR1cm4gRT11Lm1hcChmdW5jdGlvbihlLHQpe3ZhciBpLHM9e2VsZW1lbnQ6bChlKSxzaXplOlVbdF0sbWluU2l6ZTp4W3RdfTtpZih0PjAmJihpPXthOnQtMSxiOnQsZHJhZ2dpbmc6ITEsaXNGaXJzdDoxPT09dCxpc0xhc3Q6dD09PXUubGVuZ3RoLTEsZGlyZWN0aW9uOk8scGFyZW50Ond9LGkuYUd1dHRlclNpemU9TCxpLmJHdXR0ZXJTaXplPUwsaS5pc0ZpcnN0JiYoaS5hR3V0dGVyU2l6ZT1MLzIpLGkuaXNMYXN0JiYoaS5iR3V0dGVyU2l6ZT1MLzIpLFwicm93LXJldmVyc2VcIj09PUR8fFwiY29sdW1uLXJldmVyc2VcIj09PUQpKXt2YXIgYT1pLmE7aS5hPWkuYixpLmI9YX1pZighbyYmdD4wKXt2YXIgYz1DKHQsTyk7aChjLEwpLGNbbl0oXCJtb3VzZWRvd25cIixTLmJpbmQoaSkpLGNbbl0oXCJ0b3VjaHN0YXJ0XCIsUy5iaW5kKGkpKSx3Lmluc2VydEJlZm9yZShjLHMuZWxlbWVudCksaS5ndXR0ZXI9Y30wPT09dHx8dD09PXUubGVuZ3RoLTE/eihzLmVsZW1lbnQscy5zaXplLEwvMik6eihzLmVsZW1lbnQscy5zaXplLEwpO3ZhciBmPXMuZWxlbWVudFtyXSgpW3ldO3JldHVybiBmPHMubWluU2l6ZSYmKHMubWluU2l6ZT1mKSx0PjAmJkYucHVzaChpKSxzfSksbz97c2V0U2l6ZXM6dixkZXN0cm95OnB9OntzZXRTaXplczp2LGdldFNpemVzOmZ1bmN0aW9uKCl7cmV0dXJuIEUubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBlLnNpemV9KX0sY29sbGFwc2U6ZnVuY3Rpb24oZSl7aWYoZT09PUYubGVuZ3RoKXt2YXIgdD1GW2UtMV07Zy5jYWxsKHQpLG98fGYuY2FsbCh0LHQuc2l6ZS10LmJHdXR0ZXJTaXplKX1lbHNle3ZhciBuPUZbZV07Zy5jYWxsKG4pLG98fGYuY2FsbChuLG4uYUd1dHRlclNpemUpfX0sZGVzdHJveTpwfX19KTtcbiJdfQ==
