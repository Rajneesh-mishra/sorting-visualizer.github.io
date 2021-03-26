var currentElement = 0;
var originalInputArray = [];
var SPEED = 0;
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
    SPEED = speed === "slow" ? 150 : speed === "medium" ? 50 : 10;
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
    size = 50;
  } else {
    size = 150;
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
    case "bubble":
      selectionSort(inputArr, SPEED);
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
      nodes[i].style.height = currentArray[i] * 5 + "px";
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
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (inputArr[j] > inputArr[j + 1]) {
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
        await wait(speed);
        currentElement = j;
        render(inputArr);
      }
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
    }
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
    await wait(speed);
    render(arr);
    currentElement = temp;
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
