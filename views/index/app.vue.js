const AppTemplate = /*html*/ `
<div class="control-section dashboard-dynamic">
      <ejs-dashboardlayout
        ref="DashbordInstance"
        :columns="8"
        :cellSpacing="spacing"
        :cellAspectRatio="cellAspectRatio"
        :resizeStop="onPanelResize">

        <e-panels>
          <!-- Painel 1 -->
          <e-panel
            :row="0"
            :col="0"
            :sizeX="columnSizeX"
            :sizeY="columnSizeY"
            header="<div class='charttitle'>Sales - Yearly Performance</div>">

            <template #content>
              <div id="chart1">[Aqui entra o gráfico de colunas]</div>
            </template>
          </e-panel>

          <!-- Painel 2 -->
          <e-panel
            :row="0"
            :col="pieColumn"
            :sizeX="pieSizeX"
            :sizeY="pieSizeY"
            header="<div class='charttitle'>Product Wise Sales - 2024</div>">
      
            <template #content>
              <div id="chart2">[Aqui entra o gráfico de pizza]</div>
            </template>
          </e-panel>

          <!-- Painel 3 -->
          <e-panel
            :row="splineRow"
            :col="0"
            :sizeX="splineSizeX"
            :sizeY="splineSizeY"
            header="<div class='charttitle'>Monthly Sales for 2024</div>">
           
            <template #content>
              <div id="chart3">[Aqui entra o gráfico de linha]</div>
            </template>
          </e-panel>
        </e-panels>
      </ejs-dashboardlayout>
    </div>
`;


Vue.component("AppVue", {
  template: AppTemplate,
  data() {
    return {
      spacing: [15, 15],
      cellAspectRatio: 0.8,
      columns: 8,
      columnSizeX: 5,
      columnSizeY: 2,
      pieColumn: 5,
      pieSizeX: 3,
      pieSizeY: 2,
      splineRow: 4,
      splineSizeX: 8,
      splineSizeY: 3,
    };
  },

  methods: {
    onPanelResize(args) {
      const dashboardObject = this.$refs.DashbordInstance;
      if (dashboardObject && args.element) {
        const chart = args.element.querySelector('.e-control');
        if (chart && chart.ej2_instances) {
          chart.ej2_instances[0].refresh();
        }
      }
    }
  },

  watch: {},
});


