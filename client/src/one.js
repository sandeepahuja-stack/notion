let obj = {
  filters: [
    {
      filter: {
        value: {
          type: "exact",
          value: "sa",
        },
        operator: "string_contains",
      },
      property: "title",
    },
    {
      filters: [
        {
          filter: {
            value: [
              {
                type: "exact",
                value: "Backend",
              },
              {
                type: "exact",
                value: "Frontend",
              },
              {
                type: "exact",
                value: "Full Stack",
              },
            ],
            operator: "enum_is",
          },
          property: "'!~!",
        },
      ],
      operator: "or",
    },
    {
      filter: {
        value: {
          type: "exact",
          value: "n",
        },
        operator: "string_contains",
      },
      property: "title",
    },
    {
      property: "OTT=",
      filter: {
        operator: "enum_contains",
        value: [
          {
            type: "exact",
            value: "React",
          },
          {
            type: "exact",
            value: "Js",
          },
          {
            type: "exact",
            value: "Node",
          },
        ],
      },
    },
    {
      operator: "or",
      filters: [
        {
          property: "OTT=",
          filter: {
            operator: "enum_contains",
            value: [
              {
                type: "exact",
                value: "React",
              },
              {
                type: "exact",
                value: "Js",
              },
              {
                type: "exact",
                value: "Node",
              },
            ],
          },
        },
        {
          operator: "and",
          filters: [
            {
              property: "OTT=",
              filter: {
                operator: "enum_contains",
                value: [
                  {
                    type: "exact",
                    value: "React",
                  },
                  {
                    type: "exact",
                    value: "Js",
                  },
                  {
                    type: "exact",
                    value: "Node",
                  },
                ],
              },
            },
            {
              property: "OTT=",
              filter: {
                operator: "enum_contains",
                value: [
                  {
                    type: "exact",
                    value: "React",
                  },
                  {
                    type: "exact",
                    value: "Js",
                  },
                  {
                    type: "exact",
                    value: "Node",
                  },
                ],
              },
            },
            {
              property: "OTT=",
              filter: {
                operator: "enum_contains",
                value: [
                  {
                    type: "exact",
                    value: "React",
                  },
                  {
                    type: "exact",
                    value: "Js",
                  },
                  {
                    type: "exact",
                    value: "Node",
                  },
                ],
              },
            },
            {
              property: "OTT=",
              filter: {
                operator: "enum_contains",
                value: [
                  {
                    type: "exact",
                    value: "React",
                  },
                  {
                    type: "exact",
                    value: "Js",
                  },
                  {
                    type: "exact",
                    value: "Node",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  operator: "and",
};
let obj2 = {
  operator: "and",
  filters: [
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
          value: "sandeep",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
  ],
};

export const obj3 = {
  operator: "and",
  filters: [
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
          value: "sandeep",
        },
      },
    }
    
  ],
};


const obj4 = {
  operator: "and",
  filters: [
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
          value: "sandeep",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      property: "title",
      filter: {
        operator: "string_contains",
        value: {
          type: "exact",
        },
      },
    },
    {
      operator: "or",
      filters: [
        {
          property: "title",
          filter: {
            operator: "string_contains",
            value: {
              type: "exact",
            },
          },
        },
      ],
    },
    {
      operator: "or",
      filters: [
        {
          property: "title",
          filter: {
            operator: "string_contains",
            value: {
              type: "exact",
            },
          },
        },
      ],
    },
  ],
};
