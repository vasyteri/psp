export class BackButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const buttonHtml = `<button id="back-button" class="back-button">← Назад</button>`;
        this.parent.insertAdjacentHTML('beforeend', buttonHtml);
        
        document.getElementById('back-button').addEventListener('click', () => {
            if (this.onClick) this.onClick();
        });
    }
}