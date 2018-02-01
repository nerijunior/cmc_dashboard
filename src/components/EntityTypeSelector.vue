<template>
  <div>
    <h2>Selecione uma categoria</h2>
    <el-button v-for="entity in entities" v-if="entity.enabled"
      :key="entity.id"
      @click="chooseEntityType(entity)"
      type="primary">
      {{ entity.name }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'EntityTypeSelector',
  data () {
    return {
      entities: [
        { name: 'Vereadores', id: 1, enabled: true },
        { name: 'Efetivos', id: 2, enabled: true },
        { name: 'Comissionados', id: 3, enabled: true },
        { name: 'Inativos', id: 4, enabled: true },
        { name: 'Ouvidor', id: 5, enabled: false },
        { name: 'Cedido para a Câmara', id: 6, enabled: true },
        { name: 'Cedido pela Câmara', id: 7, enabled: false },
        { name: 'Temporário', id: 8, enabled: false },
        { name: 'Estagiário', id: 9, enabled: true }
      ]
    }
  },
  methods: {
    chooseEntityType (type) {
      this.$emit('choosed', type)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
