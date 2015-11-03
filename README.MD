When committing, use command `npm run commit` instead of `git commit`.

Consult the [Commit Guidelines](ht~tps://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) from the Angular team, we are closely following them.

## API Definition

```javascript
createAgent(Random: OauthToken)
{
	"userId": 2
}

endorseTag(Int: tagId)
{
	"tagPopularity": 2
}

evaluateLink(Int: linkId, Float: linkRank)
{
	"linkRank": 4.3
}

getAllTags()
[
	{
		"tagId": 1
		"tagName": "Vitalik",
		"linksCount": 12,
		"tagPopularity": 12
	}
	...
]

getSpecificAgent(agentId)
{
	"tokens": 150,
	"reputation": 200,
	"ether": 2000
	"email": "Ore4444@gmail.com"
	"avatar": "http://s.jpg"
}

getLinksByTag(tagId)
[
	{
		"linkId": 12,
		"linkTitle": "URL Title",
		"linkUrl": "http://...",
		"linkRank": *1.0-5.0*
		"tags": [
			{
				"tagId": 1
				"tagName": "Vitalik",
				"tagPopularity": 12
			}
			...
		]
	}
	...
]

getByQuery(query)
[
	{
		"resultType": "tag",
		"tagId": 12
		"tagName": "Vitalik",
		"linksCount": 12,
		"tagPopularity": 12
	},
	{
		"resultType": "link",
		"linkId": 12,
		"linkTitle": "URL Title",
		"linkUrl": "http://...",
		"linkRank": *1.0-5.0*
	}
	...
]

sendLink(String: linkTitle, Url: linkUrl, Array: tags)
{
	"linkId": 15
}

addTagToLink(Int: linkId, String: tagName)
{
	"tagId": 13
}
```