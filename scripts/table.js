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
    companies: null,
    filterz: filterLibrary,
    sectors: filterLibrary.sectors,
    selectedAge: null,
    filteredCompanies: null
  },

  created: function () {
    this.fetchData();
  },

  watch: {
    selectedAge: 'filterCompanies',
    companies: function () {
      this.filteredCompanies = this.companies.slice();
    },
    activeSectors: 'filterCompanies'
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
      return this.sectors.filter(function (s) { return s.active; })
    },
    inactiveSectors: function () {
      return this.sectors.filter(function (s) { return !s.active; })
    }
  },

  methods: {
    filterCompanies: function (a) {
      var self = this;
      
      self.filteredCompanies = self.companies.filter(function (co) {
        // no filters selected, so return everything
        if (!self.activeSectors.length) return true;

        return self.activeSectors.some(function (sector) {
          return co.sectors.indexOf(sector.label) !== -1;
        });
      }).filter(function (co) {
        if (!self.selectedAge) return true;
        return co.age > self.selectedAge.min && co.age <= self.selectedAge.max;        
      });

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