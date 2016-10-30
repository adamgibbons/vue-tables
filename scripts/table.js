// TODO:
// ALLOW SELECTION OF MULTIPLE AGES

var filterLibrary = {
  sectors: [
    {
      label: 'Analytics',
      active: false
    },
    {
      label: 'Cloud',
      active: false
    },
    {
      label: 'Social/Community',
      active: false
    }
  ],
  ages: [
    {
      order: 1,
      label: '< 2',
      min: 0,
      max: 2,
      active: false
    },
    {
      order: 2,
      label: '2 to 5',
      min: 2,
      max: 6,
      active: false
    },
    {
      order: 3,
      label: '6 to 10',
      min: 6,
      max: 11,
      active: false
    },
    {
      order: 4,
      label: '11+',
      min: 11,
      max: 1000,
      active: false
    }
  ]
};

var demo = new Vue({

  el: '#explorer',

  data: {
    companies: null,
    sectors: filterLibrary.sectors,
    ages: filterLibrary.ages,
    filteredCompanies: []
  },

  created: function () {
    this.fetchData();
  },

  watch: {
    // selectedAge: 'filterCompanies',
    companies: function () {
      this.filteredCompanies = this.companies.slice();
    },
    sectors: 'filterCompanies',
    ages: 'filterCompanies'
  },

  filters: {
    name: function (company) {
      return company.company;
    },
    funding: function (company) {
      if (!company) return 'N/A';
      if (company === 'Undiscloed') return company;
      return '$' + company.totalFunding + 'M';
    }
  },

  computed: {
    activeSectors: function () {
      return this.sectors.filter(function (s) { return s.active; });
    },
    inactiveSectors: function () {
      return this.sectors.filter(function (s) { return !s.active; });
    },
    activeAges: function () {
      return this.ages.filter(function (a) { return a.active; });
    },
    inactiveAges: function () {
      return this.ages.filter(function (a) { return !a.active; });
    }
  },

  methods: {
    filterCompanies: function (companies) {
      var self = this;
      return companies.filter(function (co) {
        if (!self.activeSectors.length) return true;
        return self.activeSectors.some(function (sector) {
          return co.sectors.indexOf(sector.label) !== -1;
        });
      }).filter(function (co) {
        if (!self.activeAges.length) return true;
        return self.activeAges.some(function (age) {
          return co.age > age.min && co.age <= age.max;
        });        
      });

    // filterCompanies: function (a) {
    //   var self = this;      
    //   self.filteredCompanies = self.companies.filter(function (co) {
    //     if (!self.activeSectors.length) return true;
    //     return self.activeSectors.some(function (sector) {
    //       return co.sectors.indexOf(sector.label) !== -1;
    //     });
    //   }).filter(function (co) {
    //     if (!self.selectedAge) return true;
    //     return self.activeAges.some(function (age) {
    //       return co.age > age.min && co.age <= age.max;
    //     });
    //   });


    },

    fetchData: function () {
      this.companies = [
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