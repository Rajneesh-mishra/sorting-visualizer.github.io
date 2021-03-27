var currentElement = 0;
var originalInputArray = [];
var SPEED = 1;
var selectedAlgorithm = "none";
$(document).ready(function () {
  if (
    /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $("html").css("font-size", "11px");
  }
  render(originalInputArray);
  $("#algoCombo > .dropdown-menu > .dropdown-item").click((e) => {
    selectedAlgorithm = e.currentTarget.getAttribute("value");
    $("#algoCombo > #dropdownMenuLink").html(e.currentTarget.innerHTML);
  });
  $("#speedCombo > .dropdown-menu > .dropdown-item").click((e) => {
    const speed = e.currentTarget.getAttribute("value");
    SPEED = speed === "slow" ? 50 : speed === "medium" ? 10 : 0.01;
    $("#speedCombo > #dropdownMenuLink").html(e.currentTarget.innerHTML);
  });
  $("#visualize").click((e) => {
    $("#visualize").hide();
    $("#newArray").hide();
    visualize();
  });
  $("#newArray").click((e) => {
    randomArrayGenerator();
    render(originalInputArray);
  });

  // visualize();
});
randomArrayGenerator = () => {
  originalInputArray = [];
  let size;
  if (
    /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    size = 40;
  } else {
    size = 100;
  }
  for (let i = 0; i < size; i++) {
    originalInputArray.push(Math.floor(Math.random() * 100));
  }
};
randomArrayGenerator();
visualize = () => {
  const inputArr = [...originalInputArray];
  switch (selectedAlgorithm) {
    case "selection":
      selectionSort(inputArr, SPEED);
      break;
    case "insertion":
      insertionSort(inputArr, SPEED);
      break;
    case "quick":
      quickSort(inputArr, 0, inputArr.length - 1);
      break;
    case "bubble":
      bubbleSort(inputArr, SPEED);
      break;
    case "counting":
      countingSort(
        inputArr,
        inputArr.sort()[0],
        inputArr.sort()[inputArr.length - 1]
      );
      break;

    default:
      alert("select any Algorithm first");
      $("#visualize").show();
      $("#newArray").show();
      break;
  }
};
render = (currentArray) => {
  if (!$(".node")[0]) {
    currentArray.forEach((element) => {
      $(".container").append(
        `<div class="node" style="height:${element}em;width:3px;margin:2px;background-image:linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)"> </div>`
      );
    });
  } else {
    const nodes = $(".node");
    for (i in currentArray) {
      nodes[i].style.height = currentArray[i] + "em";
      if (currentElement == i) {
        nodes[i].style.background = "blue";
      } else {
        nodes[i].style.background = "#2a2a72";
        nodes[i].style.backgroundImage =
          "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)";
        // nodes[i].style.width = "2px";
      }
    }
  }
};
bubbleSort = async (inputArr, speed) => {
  let len = inputArr.length;
  let flag = true;
  for (let i = 0; i < len; i++) {
    flag = false;
    for (let j = 0; j < len; j++) {
      if (inputArr[j] > inputArr[j + 1]) {
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
        flag = true;
      }
      currentElement = j;
      render(inputArr);
      await wait(speed);
      debugger;
    }
    if (!flag) {
      break;
    }
  }
  $("#visualize").show();
  $("#newArray").show();
};
selectionSort = async (arr, speed) => {
  var minIdx,
    temp,
    len = arr.length;
  for (var i = 0; i < len; i++) {
    minIdx = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
      await wait(speed);
      currentElement = j;
      render(arr);
    }
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  $("#visualize").show();
  $("#newArray").show();

  return arr;
};
insertionSort = async (inputArr, speed) => {
  let n = inputArr.length;
  for (let i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    let current = inputArr[i];
    // The last element of our sorted subarray
    let j = i - 1;
    while (j > -1 && current < inputArr[j]) {
      inputArr[j + 1] = inputArr[j];
      j--;
      await wait(speed);
      currentElement = j;
      render(inputArr);
    }
    inputArr[j + 1] = current;
  }
  $("#visualize").show();
  $("#newArray").show();
};

wait = (ms) => {
  if (ms == 0) return;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
};

//---------------------Quick Sort--------------------

quickSort = async (items, left, right) => {
  var index;
  if (items.length > 1) {
    index = await partition(items, left, right);
    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      quickSort(items, index, right);
    }
  }
  $("#visualize").show();
  $("#newArray").show();
};
var items = [5, 3, 7, 6, 2, 9];
function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
partition = async (items, left, right) => {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
    await wait(SPEED);
    currentElement = i;
    render(items);
  }
  return i;
};

//----------------------------------------------------------------

//----------------------Counting Sort-----------------------------

countingSort = async (arr, min, max) => {
  let i = min,
    j = 0,
    len = arr.length,
    count = [];
  for (i; i <= max; i++) {
    count[i] = 0;
  }
  for (i = 0; i < len; i++) {
    count[arr[i]] += 1;
  }
  for (i = min; i <= max; i++) {
    while (count[i] > 0) {
      arr[j] = i;
      j++;
      count[i]--;
    }
    await wait(SPEED);
    currentElement = j;
    render(arr);
  }
  $("#visualize").show();
  $("#newArray").show();
};
//-------------------------------------------------------------------
