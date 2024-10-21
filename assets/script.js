const inputTarefa = document.getElementById("nova-tarefa");
const botaoAdicionar = document.getElementById("adicionar-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");

function adicionarTarefa() {
    const tarefaTexto = inputTarefa.value.trim();
    if (tarefaTexto !== "") {
        const li = document.createElement("li");
        li.draggable = "true";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const label = document.createElement("label");
        label.textContent = tarefaTexto;

        checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            label.classList.add("concluida");
            li.classList.add("concluida");
        } else {
            label.classList.remove("concluida");
            li.classList.remove("concluida");
        }
        });

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.classList.add("remover");
        botaoRemover.addEventListener("click", () => {
            li.remove();
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(botaoRemover);
        listaTarefas.appendChild(li);
        inputTarefa.value = "";
    }
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});


//Aqui sou eu fazendo graça só pra ver se consigo fazer uma lista arrastável -- Consegui :D
const arrastavel = document.getElementById("lista-tarefas");
let itemArrastado = null;

arrastavel.addEventListener(
	"dragstart",
	(e) => {
		itemArrastado = e.target;
		setTimeout(() => {
			e.target.style.display =
				"none";
		}, 0);
});

arrastavel.addEventListener(
	"dragend",
	(e) => {
		setTimeout(() => {
			e.target.style.display = "";
			itemArrastado = null;
		}, 0);
});

arrastavel.addEventListener(
	"dragover",
	(e) => {
		e.preventDefault();
		const afterElement =
			arrastadoDepoisDoElemento(
				arrastavel,
				e.clientY);
		const currentElement =
			document.querySelector(
				".dragging");
		if (afterElement == null) {
			arrastavel.appendChild(
				itemArrastado
			);} 
		else {
			arrastavel.insertBefore(
				itemArrastado,
				afterElement
			);}
	});

const arrastadoDepoisDoElemento = (
	container, y
) => {
	const draggableElements = [
		...container.querySelectorAll(
			"li:not(.dragging)"
		),];

	return draggableElements.reduce(
		(closest, child) => {
			const box =
				child.getBoundingClientRect();
			const offset =
				y - box.top - box.height / 2;
			if (
				offset < 0 &&
				offset > closest.offset) {
				return {
					offset: offset,
					element: child,
				};} 
			else {
				return closest;
			}},
		{
			offset: Number.NEGATIVE_INFINITY,
		}
	).element;
};
