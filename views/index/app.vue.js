const AppTemplate = /* html */ `

<div class="control-section" style="margin-top: 5%">
    <div align='center'>
        <ejs-chart
        style="display: block"
        theme="Material"
        align="center"
        id="chartcontainer"
        :title="title"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :tooltip="tooltip"
        :chartArea="chartArea"
        width=100%>
            <e-series-collection>
                <e-series
                :dataSource="seriesEntrada"
                type="Line"
                xName="x"
                yName="y"
                name="Entrada"
                width=3
                :marker="marker"
                ></e-series>
                <e-series
                :dataSource="seriesSaida"
                type="Line"
                xName="x"
                yName="y"
                name="Saída"
                width=3
                :marker="marker"
                ></e-series>
                <e-series
                :dataSource="seriesLucro"
                type="Line"
                xName="x"
                yName="y"
                name="Lucro"
                width=3
                :marker="marker"
                ></e-series>
            </e-series-collection>
        </ejs-chart>
        <br>
    </div>
</div>

`;

Vue.component('AppVue', {
  template: AppTemplate,
  data: function () {
    return {
      seriesEntrada: [],
      seriesSaida: [],
      seriesLucro: [],
      primaryXAxis: {
        valueType: "DateTime",
        labelFormat: "y",
        intervalType: "Years",
        edgeLabelPlacement: "Shift",
        majorGridLines: { width: 0 }
      },

      primaryYAxis: {
        labelFormat: "{value}",
        rangePadding: "None",
        minimum: -10000,
        maximum: 50000,
        interval: 10000,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
      },

      chartArea: { border: { width: 0 } },
      marker: { visible: true, height: 10, width: 10 },
      tooltip: { enable: true },
      title: "Resumo financeiro a cada 3 anos",
    };
  },

  mounted() {
    this.carregarDados();
  },

  computed: {
    contentValue: {
      get: function () {
        return this.content;
      },
      set: function (content) {
        this.content = content
      }
    }
  },

  methods: {
    carregarDados() {
      axios.post(BASE + '/index/movimentacoesAno').then(res => {
        if (res.data.codigo === 1) {
          this.seriesEntrada = res.data.dados.map(item => {
            return {
              x: new Date(parseInt(item.ano), 0, 1),
              y: parseFloat(item.entrada)
            };
          });

          this.seriesSaida = res.data.dados.map(item => {
            return {
              x: new Date(parseInt(item.ano), 0, 1),
              y: parseFloat(item.saida)
            };
          });

          this.seriesLucro = res.data.dados.map(item => {
            return {
              x: new Date(parseInt(item.ano), 0, 1),
              y: parseFloat(item.lucro)
            };
          });

        }
      });
    },
  }
})