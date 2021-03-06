#### 跳表概念

跳表(SkipList) 是一种各方面性能都比较优秀的动态数据结构，它通过链表发展而来，利用空间换时间的思想，支持平均 O(logn)、最坏 O(n) 的节点查找时间复杂度。在大部分情况下，效率可以和平衡树（红黑树）媲美。

对于一个单链表来讲，即便链表中存储的数据是有序的，查询的时间复杂度仍然是 O(n)，我们需要从头到尾遍历链表。那如何提高查找效率呢？我们可以借助数组二分查找算法的思路试一试。

我们让链表中的结点除了记录next指针，还让其中的几个结点记录跨结点指针，我们叫索引好了，如图所示。
![skiplist](../assets/skiplist.png ':size=633x276')

结点1除了记录了结点2的指针，还记录了结点3的指针，结点3除了记录了结点4的指针，还记录了结点5的指针，这样，假设我们要找值为5的结点，只需要遍历1-3-5三个结点即可，单链表则需要遍历5个结点。当然我这里只是增加了一层的索引，你可以依据数据规模来增加多级索引。

跳表长什么样子我想你应该已经很清楚了，它的查找操作我们刚才也讲过了。实际上，跳表这个动态数据结构，不仅支持查找操作，还支持动态的插入、删除操作，而且插入、删除操作的时间复杂度也是 O(logn)。

我们知道，在单链表中，插入操作的复杂度是O(1)，而一个有序的单链表，插入操作则需要先找到正确的插入位置O(n)，再插入，所以复杂度是O(n)，对于跳表来说，查找正确位置是O(logn)，所以插入的复杂度也是O(logn)。

#### 跳表索引动态更新

当我们不停地往跳表中插入数据时，如果我们不更新索引，就有可能出现某 2 个索引结点之间数据非常多的情况。极端情况下，跳表还会退化成单链表。作为一种动态数据结构，我们需要某种手段来维护索引与原始链表大小之间的平衡，也就是说，如果链表中结点多了，索引结点就相应地增加一些，避免复杂度退化，以及查找、插入、删除操作性能下降。

就像红黑树、AVL树这样的平衡二叉树，它们通过左右旋的方式保持左右子树的大小平衡。而跳表是通过随机函数来保持的“平衡性”。我们通过一个随机函数，来决定将这个结点插入到哪几级索引中，比如随机函数生成了值 K，那我们就将这个结点添加到第一级到第 K 级这 K 级索引中。随机函数的选择很有讲究，从概率上来讲，能够保证跳表的索引大小和数据大小平衡性，不至于性能过度退化。

#### 跳表在Redis中的实现
Redis在两个地方用到了跳表，一个是实现有序集合键，另一个是在集群节点中用作内部数据结构。

Redis使用跳表作为有序集合键(zset)的底层实现之一，如果一个有序集合包含的元素数量比较多，又或者有序集合中元素的成员（member）是比较长的字符串时，Redis就会使用跳跃表来作为有序集合键的底层实现。

Redis的跳表由src / server.h / zskiplistNode、zskiplist 两个结构定义。

![zskiplist](../assets/zskiplist.png ':size=633x418')

![redis-zskiplist](../assets/redis-zset.png ':size=633x620')

#### 参考资料
- 《redis设计与实现》
- 《数据结构与算法之美》
- Redis源码