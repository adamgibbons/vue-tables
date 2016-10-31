// TODO:
// ALLOW SELECTION OF MULTIPLE AGES

function isSector(co) {
  return co.sectors.indexOf(this.label) !== -1;
}

function isAge(co) {
  return co.age > this.min && co.age <= this.max;
}

var filterLib = {
  sectors: [
    {
      label: 'Analytics',
      active: false,
      category: 'sectors',
      fn: isSector
    },
    {
      label: 'Cloud',
      active: false,
      category: 'sectors',
      fn: isSector
    },
    {
      label: 'Social/Community',
      active: false,
      category: 'sectors',
      fn: isSector
    }
  ],
  ages: [
    {
      order: 1,
      label: '< 2',
      min: 0,
      max: 2,
      active: false,
      category: 'ages',
      fn: isAge
    },
    {
      order: 2,
      label: '2 to 5',
      min: 2,
      max: 6,
      active: false,
      category: 'ages',
      fn: isAge
    },
    {
      order: 3,
      label: '6 to 10',
      min: 6,
      max: 11,
      active: false,
      category: 'ages',
      fn: isAge
    },
    {
      order: 4,
      label: '11+',
      min: 11,
      max: 1000,
      active: false,
      category: 'ages',
      fn: isAge
    }
  ]
};

var demo = new Vue({

  el: '#explorer',

  data: {
    companies: null,
    sectors: filterLib.sectors,
    ages: filterLib.ages,
    filteredCompanies: [],
    sectorSearchString: '',
    ageSearchString: '',
    sectorSearchResults: [],
    ageSearchResults: []
  },

  created: function () {
    // this.reset();
    this.fetchData();
  },

  watch: {
    companies: function () {
      this.filteredCompanies = this.companies.slice();
    },
    sectors: 'filterCompanies',
    ages: 'filterCompanies',
    sectorSearchString: 'searchSectors',
    ageSearchString: 'searchAges'
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
    resetSearch: function () {
      this.sectorSearchResults = [];
      this.sectorSearchString = '';
      this.ageSearchString = '';
    },

    searchSectors: function (newVal) {
      if (!newVal || newVal.length < 3) {
        this.sectorSearchResults = [];
        return;
      }

      var self = this;
      self.sectorSearchResults = self.inactiveSectors.filter(function (sector) {
        return sector.label.toLowerCase().indexOf(newVal) !== -1;
      });
    },

    searchAges: function (newVal) {
      var self = this;

      if (!newVal || newVal.length < 3) {
        this.ageSearchResults = [];
        return;
      }

      self.ageSearchResults = self.inactiveAges.filter(function (age) {
        return age.label.toLowerCase().indexOf(newVal) !== -1;
      });
    },

    filterCompanies: function (companies) {
      var self = this
      ,   activeFilters = this.activeSectors.concat(this.activeAges);

      if (!activeFilters.length) return companies;

      return companies.filter(function (co) {
        return [self.activeSectors, self.activeAges].every(function (rules) {
          if (!rules.length) return true;
          return rules.some(function (rule) {
            return rule.fn.call(rule, co);
          })
        });
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
    },

    reset: function () {
      this.sectorSearchString = '';
      this.ageSearchString = '';
      this.sectors = filterLib.sectors.map(deactivate);
      this.ages = filterLib.ages.map(deactivate);
      this.sectorSearchResults = [];
      function deactivate (node) {
        node.active = false;
        return node;
      }
    }
  }

});