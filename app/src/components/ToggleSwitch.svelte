<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let isEditMode = false;

    function toggleEditMode() {
		isEditMode = !isEditMode;
        dispatch('isEditModeChange', isEditMode)
	}
</script>

<main>
    <div class="toggle-switch">
        <input type="checkbox" class="toggle-input" on:click={toggleEditMode}>
        <!--{isEditMode ? 'leave edit mode' : 'go to edit mode'}-->
    </div>
</main>

<style>
.toggle-switch {
 margin: 10px;
 display: flex;
 align-items: center;
 color: white;
}

.toggle-switch input[type="checkbox"] {
 appearance: none;
 width: 48px;
 height: 26px;
 border-radius: 10px;
 background: rgb(197, 193, 190);
 position: relative;
 box-sizing: border-box;
}

.toggle-switch input[type="checkbox"]::before {
 content: "";
 width: 14px;
 height: 14px;
 background: #938bee;
 border: 2px solid #938bee;
 border-radius: 50%;
 position: absolute;
 top: 0;
 left: 0;
 transform: translate(13%, 15%);
 transition: all 0.3s ease-in-out;
}

.toggle-switch input[type="checkbox"]::after {
 content: url("data:image/svg+xml,%3Csvg width='17' height='17' clip-rule='evenodd' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23938bee' d='m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z' fill-rule='nonzero'/%3E%3C/svg%3E");
 position: absolute;
 top: 3px;
 left: 25px;
}

.toggle-switch input[type="checkbox"]:checked {
 background: rgb(197, 193, 190);
}

.toggle-switch input[type="checkbox"]:checked::before {
 background: #e96e26;
 border: 2px solid #e96e26;
 transform: translate(133%, 13%);
 transition: all 0.3s ease-in-out;
}

.toggle-switch input[type="checkbox"]:checked::after {
 content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 24 24'%3E%3Cpath fill='%23e96e26' d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z'/%3E%3C/svg%3E");
 position: absolute;
 top: 3px;
 left: 3px;
}

</style>