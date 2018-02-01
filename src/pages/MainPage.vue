<template>
  <div id="main-page">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <h1>Holerites - Câmara Municipal de Curitiba - 2017</h1>
      </el-col>
      <el-col :span="12" :offset="6">
        <el-steps :active="step" finish-status="success">
          <el-step title="Cargo"></el-step>
          <el-step title="Quem?"></el-step>
          <el-step title="Dados"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="2" :offset="11">
        <div class="loader">
          <hollow-dots-spinner v-if="loading"
            :animation-duration="1000"
            :dot-size="15"
            :dots-num="3"
            :color="'#409EFF'"
          />
        </div>
      </el-col>
      <el-col :span="12" :offset="6">
        <transition>
          <entity-type-selector v-if="step === 0" @choosed="choosedType"></entity-type-selector>
        </transition>
      </el-col>
      <el-col :span="12" :offset="6">
        <transition>
          <entity-table v-if="step === 1" @back="step = 0" :type="selectedType" :data="data" @choosed="choosedEntity"></entity-table>
        </transition>
      </el-col>
    </el-row>

    <el-dialog
      v-if="selectedEntity"
      :title="selectedEntity.cargo + ': ' + selectedEntity.nome"
      :visible.sync="dialogViewEntityData"
      @close="step = 1"
      width="90%">

      <el-row :gutter="20">
        <el-col :xs="24" :span="12">
          <div class="chart">
            <vue-chart
              type="line"
              :data="getEntityChartData()"
              :options="{scales: {yAxes: [{ticks: {beginAtZero: true}}]}}"
              :update-config="{duration: 800, easing: 'easeOutBounce'}"
            ></vue-chart>
          </div>
        </el-col>

        <el-col :xs="24" :span="12">
          <el-tabs type="card">
            <el-tab-pane v-for="(salary, key) in selectedEntity.salaries" :key="key" :label="key">
              <el-table
                :data="getSalaryDataForTable(salary)"
                style="width: 100%">
                <el-table-column
                  prop="key"
                  label="Tipo">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="Valor">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {HollowDotsSpinner} from 'epic-spinners'
import EntityTypeSelector from '@/components/EntityTypeSelector'
import EntityTable from '@/components/EntityTable'
import FileService from '@/services/FileService'

const colors = {
  blue: 'rgb(54, 162, 235)',
  green: 'rgb(75, 192, 192)',
  grey: 'rgb(201, 203, 207)',
  orange: 'rgb(255, 159, 64)',
  purple: 'rgb(153, 102, 255)',
  red: 'rgb(255, 99, 132)',
  yellow: 'rgb(255, 205, 86)'
}

export default {
  name: 'MainPage',
  components: {
    HollowDotsSpinner,
    EntityTypeSelector,
    EntityTable
  },
  data () {
    return {
      loading: false,
      step: 0,
      selectedType: null,
      data: null,
      dialogViewEntityData: false,
      selectedEntity: null
    }
  },
  methods: {
    choosedType (type) {
      this.selectedType = type.name
      this.loading = true

      const fileUrl = FileService.getEntityFileByGrupoId(type.id)

      fetch(fileUrl)
        .then(response => response.json())
        .then(response => {
          this.data = response
          this.step = 1
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => { this.loading = false })
    },
    choosedEntity (entity) {
      this.dialogViewEntityData = true
      this.selectedEntity = entity
      this.step = 2
    },
    getSalaryDataForTable (salary) {
      salary = JSON.parse(JSON.stringify(salary))
      return Object.keys(salary).map(key => {
        return {
          key: key,
          value: salary[key]
        }
      })
    },
    getEntityChartData () {
      let salaries = this.selectedEntity.salaries
      salaries = JSON.parse(JSON.stringify(salaries))

      const months = Object.keys(salaries)
      const keys = Object.keys(salaries[months[0]])
      const datasets = []

      const colorNames = Object.keys(colors)

      keys.map(key => {
        let data = Object.keys(salaries).map(month => {
          const salary = salaries[month]
          let amount = salary[key]
          amount = amount.replace(',', '')

          return amount
        })

        const color = colorNames[datasets.length % colorNames.length]

        datasets.push({
          label: key,
          data: data,
          borderColor: colors[color],
          fill: false
        })
      })

      return {
        labels: months,
        datasets: datasets
      }
    }
  }
}
</script>

<style lang="css" scoped>
.loader{
  margin: 50px 0;
}
.chart{
  width: 100%;
}
</style>
