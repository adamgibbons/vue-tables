var filterLibrary = {
  sectors: ['Analytics', 'Cloud', 'Social/Community'],
  ages: [
    {
      order: 1,
      label: '< 2',
      min: 0,
      max: 2
    },
    {
      order: 2,
      label: '2 to 5',
      min: 2,
      max: 6
    },
    {
      order: 3,
      label: '6 to 10',
      min: 6,
      max: 11
    },
    {
      order: 4,
      label: '11+',
      min: 11,
      max: 1000
    }
  ]
};

var demo = new Vue({

  el: '#explorer',

  data: {
    filters: filterLibrary,
    selectedSector: null,
    selectedAge: null,
    companies: null,
    filteredCompanies: null
  },

  created: function () {
    this.fetchData();
    this.resetList();
  },

  watch: {
    companies: 'fetchData',
    selectedSector: 'filterCompanies',
    selectedAge: 'filterCompanies'
  },

  filters: {
    name: function (company) {
      return company.company;
    }
  },

  methods: {
    filterCompanies: function (a) {
      var self = this;
      
      self.filteredCompanies = self.companies.filter(function (co) {
        if (!self.selectedSector) return true;
        return co.sectors.indexOf(self.selectedSector) !== -1;
      }).filter(function (co) {
        if (!self.selectedAge) return true;
        return co.age > self.selectedAge.min && co.age <= self.selectedAge.max;        
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
    },
    resetList: function() {
      var self = this;
      self.filteredCompanies = self.companies.slice(0);
    }
  }
});