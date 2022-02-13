var app = new Vue({
  el: "#app",
  data: {
    list: [
      { checked: true, text: "Complete online JavaScript course", id: 1 },
      { checked: false, text: "Jog around the park 3x", id: 2 },
      { checked: false, text: "10 minutes meditation", id: 3 },
      { checked: false, text: "Read for 1 hour", id: 4 },
      { checked: false, text: "Pick up groceries", id: 5 },
      { checked: false, text: "Complete Todo App on Frontend Mentor", id: 6 },
    ],
    optionActive: "All",
    options: [{ name: "All" }, { name: "Active" }, { name: "Completed" }],
    filteredList: null,
    createTodoInput: "",
    itemLeft: null,
    lastSelection: null,
    darkTheme: false,
  },
  methods: {
    createItem(text) {
      let item = new Object();
      item.checked = false;
      item.text = `${text}`;
      return item;
    },
    push() {
      if (this.createTodoInput === "") {
        return;
      }
      this.list.push(this.createItem(this.createTodoInput));
      this.filterList(this.lastSelection);
      this.createTodoInput = "";
    },
    check(index) {
      this.list.map((item) => {
        if (item.id === index) {
          item.checked = true;
        }
      });
      this.filterList(this.lastSelection);
    },
    clearChecked() {
      let indexToDelete = this.list.filter((item) => item.checked === true);
      indexToDelete.forEach((item) => {
        this.list.splice(this.list.indexOf(item), 1);
      });
      this.filterList(this.lastSelection);
    },
    deleteTodo(index) {
      let indexToDelete;
      this.list.map((item) => {
        if (item.id === index) {
          indexToDelete = this.list.indexOf(item);
        }
      });
      this.list.splice(indexToDelete, 1);
      this.filterList(this.lastSelection);
    },
    filterList(val) {
      this.optionActive = val;
      console.log(val);
      let dic = {
        All: null,
        Active: false,
        Completed: true,
      };
      value = dic[val];

      if (value === null) {
        this.filteredList = this.list.filter((item) => {
          return item.checked != null;
        });
      } else {
        this.filteredList = this.list.filter((item) => {
          return item.checked === value;
        });
      }
      this.lastSelection = val;
    },
    themeSwitcher() {
      this.darkTheme = !this.darkTheme;
      if (this.darkTheme) {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      }
    },
  },
  computed: {
    detectItemLeft() {
      let i = 0;
      this.list.forEach((item) => {
        if (item.checked != true) {
          i++;
        }
      });
      return i;
    },
  },
  created: function () {
    this.filterList("All");
    this.themeSwitcher();
  },
  mounted: function () {
    let draggable = document.querySelector(".todo__list");

    new Sortable(draggable, {
      animation: 150,
      ghostClass: "blue-background-class",
    });
  },
});
