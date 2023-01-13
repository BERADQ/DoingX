<script lang="ts">

</script>

<div class="main">
    <div class="back">

    </div>
</div>

<style lang="postcss">
    .main{
        width: 100%;
        height: 100%;
        & .back{
            width: 100%;
            height: 100%;
            background-color: #FFF7DE;
            border-radius: var(--mainRadius);
            transition: all 180ms;
            box-shadow: 0 0 3px rgba(33,33,33,.3);
            &:hover{
                transform: scale(102%);
                box-shadow: 0 0 12px rgba(33,33,33,.3);
            }
        }
    }
</style>