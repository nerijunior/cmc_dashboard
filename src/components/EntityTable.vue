<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button @click="$emit('back')" type="primary" icon="el-icon-arrow-left">Trocar Categoria</el-button>
      </el-col>
      <el-col :span="12">
        <h3>Categoria Selecionada: {{ type }}</h3>
      </el-col>
    </el-row>
    <br>
    <el-table
      border
      :data="data"
      :default-sort = "{prop: 'nome', order: 'ascending'}"
      :empty-text="'Nenhum dado encontrado'"
      @row-click="chooseEntity"
      style="width: 100%">
      <el-table-column
        prop="nome"
        label="Nome"
        sortable>
      </el-table-column>
      <el-table-column
        prop="cargo"
        label="Cargo"
        sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'EntityTable',
  props: ['data', 'type'],
  methods: {
    chooseEntity (entity) {
      this.$emit('choosed', entity)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
