When committing, use command `npm run commit` instead of `git commit`.

Consult the [Commit Guidelines](ht~tps://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) from the Angular team, we are closely following them.

## API Definition

```javascript
== createAgent ==
{{baseURL}}/agents?agentName=OauthToken

{
	"userId": 2
}

== getAgent ==
{{baseURL}}/agents/:id?fields=name,handles,collaborations

(ether balance will have to come from some other service, or we can use the handle fields as a bypass to keep track of it.)

{
    id: "agent unique id1",
    name: "JohnLennon",
    handles: [
        {
            name: "Ore4444@gmail.com",
            type: "gmail"
        },
        {
            name: "http://s.jpg",
            type: "avatar"
        }
    ],
    collaborations: [
        {
            id: "collaboration unique id1",
            tokens: 54,
            reputation: 234
        }
    ]
}

== submitUrlAndTags ==
{{baseURL}}/contributions?type=URLAndTags

notice you'll have to make a distinct "get agent" call to get back the new reputation of the contributor in case you get evaluation IDs back.
also notice you have to add link evaluation to your call.

request body:
{
    "creator": "agentId",
    "collaboration": "collaborationId",
    "content": 
    {
        "title": "Sheker inc.",
        "evaluation": "4",
        "links": "some.sheker.url",
        "tags": [
            "tag1",
            "tag2",
            "tag3"
        ]
    }
}

response:
{
    id: [
        "contribution unique id of URL",
        "evaluation unique id of URL",
        "contribution unique id of Tag1",
        "contribution unique id of Tag2",
        "evaluation unique id of Tag3"
    ],
    contributorsBalance: [
        {
            id: "agentid of contributor",
            newTokenBalance:543,
            oldTokenBalance:583
        }
    ]
}

== submitTags ==
{{baseURL}}/contributions?type=Tags

Request body:
{
    creator: "agentId",
    collaboration: "collaborationId",
    "content": 
    {
        "title": "Sheker inc.",
        "links": "some.sheker.url",
        "tags": [
            "tag1",
            "tag2",
            "tag3"
        ]
    }
}

Response:
{
    id: [
        "contribution unique id of Tag1",
        "contribution unique id of Tag2",
        "evaluation unique id of Tag3"
    ],
    contributorsBalance: [
        {
            id: "agentid of contributor1",
            newTokenBalance:543,
            oldTokenBalance:583
        }
    ]
}

== endorseTag ==
{{baseURL}}/evaluations/contributions/:id?fields=senderTokenReputationChange, contributionNewValue

{
	id: "evaluation id",
	contributionNewValue: "tag value, not popularity. you will probably need to call for all evaluations and calculate popularity in the app"
	senderTokenReputationChange: {
        	agentId: "agent id",
        	agentNewReputationBalance: 1012,
        	agentOldReputationBalance: 1015,
        	agentNewTokenBalance: 600,
        	agentOldTokenBalance: 600
	}
}

== evaluateLink ==
{{baseURL}}/evaluations/contributions/:id?fields=senderTokenReputationChange, contributionNewValue

Request body:
{
    evaluation: "number of stars",
}

Response:
{
	id: "evaluation id",
    	contributionNewValue: "value of contribution after evaluation",
    	senderTokenReputationChange: {
        	agentId: "agent id",
        	agentNewReputationBalance: 1012,
        	agentOldReputationBalance: 1015,
        	agentNewTokenBalance: 600,
        	agentOldTokenBalance: 600
    	}
}

== getAllTags ==
[
	{
		"id": 1,
		"name": "Vitalik",
		"linksCount": 12,
		"popularity": 12
	}
	...
]

== getLinksByTag ==
(tagId)
[
	{
		"id": 12,
		"title": "URL Title",
		"url": "http://...",
		"rank": *1.0-5.0*,
		"tags": [
			{
				"id": 1,
				"name": "Vitalik",
				"popularity": 12
			}
			...
		]
	}
	...
]

== getLinksAndTagsByQuery ==

[
	{
		"resultType": "tag",
		"id": 12,
		"name": "Vitalik",
		"linksCount": 12,
		"popularity": 12
	},
	{
		"resultType": "link",
		"id": 12,
		"title": "URL Title",
		"url": "http://...",
		"rank": *1.0-5.0*
	}
	...
]
```