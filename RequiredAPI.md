# 需求API

## 投票

1. GetElectionList 获取所有列表
   - Header
   
   - Input

        | 参数名             | 类型     | 必填项 | 默认值   | 备注                     |
        |-----------------|--------|-----|-------|------------------------|
        | keyword         | String |     |       | 查询关键词                  |
        | type            |        |     |       | 投票类型 0:公开 1:封闭         |
        | showUnavailable |        | 否   | false | 是否展示不可见投票              |
        | isAnonymity     |        |     |       | 是否匿名                   |
        | state           |        |     |       | 状态 0: 未开始 1: 进行中 2:已结束 |
        | page            |        |     |       |                        |
        | pageSize        |        |     |       |                        |
        |                 |        |     |       |                        |

   - Output
   
        | 参数名           | 类型    | 备注                     |   |
        |---------------|-------|------------------------|---|
        |               | Array | 投票列表                   |   |
        | - id          |       | 投票ID                   |   |
        | - name        |       | 投票名称                   |   |
        | - type        |       | 投票类型 0:公开 1:封闭         |   |
        | - isAnonymity |       | 是否匿名                   |   |
        | - state       |       | 状态 0: 未开始 1: 进行中 2:已结束 |   |

2. GetElection 获取投票详情
    - Input
      id
    Output

      | 参数名            | 类型    | 备注                     |  |
      |----------------|-------|------------------------|--|
      | id             |       | 投票ID                   |  |
      | name           |       | 投票名称                   |  |
      | type           |       | 投票类型 0:公开 1:封闭         |  |
      | isAnonymity    |       | 是否匿名                   |  |
      | state          |       | 状态 0: 未开始 1: 进行中 2:已结束 |  |
      | electionResult | Array |                        |  |
      | - name         |       | 名称                     |  |
      | - description  |       | 介绍                     |  |
      | - declaration  |       | 宣言                     |  |
      | - ballot       |       | 票数                     |  |
3. Vote 投票


## 用户

1. Login
2. Refresh
3. GetUserInfo
