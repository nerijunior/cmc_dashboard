<template>
  <div>
    <h2>Selecione uma categoria</h2>
    <el-row :gutter="20">
      <el-col v-for="entity in entities" :key="entity.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="3">
        <el-button v-if="entity.enabled"
          @click="chooseEntityType(entity)"
          type="primary">
          {{ entity.name }}
        </el-button>
      </el-col>
    </el-row>
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
      window.ga('send', 'event', {
        eventCategory: 'Entity Type Selected',
        eventAction: 'click',
        eventLabel: type.name
      })

      this.$emit('choosed', type)
    }
  }
}
</script>

<style lang="css" scoped>
.el-button{
  margin-bottom: 10px;
}
h2{
  font-size: 1rem;
}
</style>
