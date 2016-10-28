    // filters: {
    //   sectors: ['Analytics', 'Cloud', 'Social/Community'],
    //   funding: [
    //     {
    //       label: '< 2',
    //       min: 0,
    //       max: 2
    //     },
    //     {
    //       label: '2 to 5',
    //       min: 2,
    //       max: 6
    //     },
    //     {
    //       label: '6 to 10',
    //       min: 6,
    //       max: 11
    //     },
    //     {
    //       label: '11+',
    //       min: 11,
    //       max: 1000
    //     }
    //   ]
    // }

var demo = new Vue({

  el: '#explorer',

  data: {
    sectors: ['Analytics', 'Cloud', 'Social/Community'],
    selectedSector: null,
    companies: null,
    filteredCompanies: null
  },

  created: function () {
    this.fetchData()
  },

  watch: {
    companies: 'fetchData',
    selectedSector: 'filterBySector'
  },

  filters: {
    name: function (company) {
      return company.company;
    }
  },

  methods: {
    filterBySector: function () {
      var self = this;
      this.filteredCompanies = this.companies.filter(function (co) {
        return co.sectors.indexOf(self.selectedSector) !== -1;
      });
    },
    fetchData: function () {
      return this.companies = [
        {
          selected: false,
          company: 'App Annie',
          sectors: ['Analytics'],
          totalFunding: 123,
          age: 6,
          investors: ['Greycroft Partners', 'Sequoia Capital']
        },
        {
          selected: false,
          company: 'Github',
          sectors: ['Cloud', 'Social/Community'],
          totalFunding: 456,
          age: 8,
          investors: ['Andreessen Horowitz', 'SV Angel']
        }
      ];
    }
  }
});