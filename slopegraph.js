d3.custom = {};
d3.custom.slopegraph = function() {

    var opts = {
        width: 400,
        height: 200,
        margin: {top: 20, right: 50, bottom: 50, left: 50},
        labelLength: 50
    };

    function exports(selection) {
        selection.each(function (dataset) {
            var chartHeight = opts.height - opts.margin.top - opts.margin.bottom;
            var chartWidth = opts.width - opts.margin.right - opts.margin.left;

            var parent = d3.select(this);
            var svg = parent.selectAll("svg.chart-root").data([0]);
            svg.enter().append("svg").attr("class", "chart-root")
                    .append('g').attr('class', 'chart-group');
            svg.attr({width: opts.width, height: opts.height});
            svg.exit().remove();
            var chartSvg = svg.select('.chart-group');

            var data = d3.transpose(dataset.data);
            var scale = d3.scale.linear().domain(d3.extent(d3.merge(data))).range([0, chartHeight]);

            var lines = chartSvg.selectAll('line.slope-line')
                .data(data);
            lines.enter().append("line")
            lines.attr({
                    class: 'slope-line',
                    x1: opts.margin.left + opts.labelLength,
                    x2: opts.width - opts.margin.right - opts.labelLength,
                    y1: function(d) { return opts.margin.top + scale(d[0]); },
                    y2: function(d) { return opts.margin.top + scale(d[1]); }});
            lines.exit().remove();

            var leftLabels = chartSvg.selectAll('text.left_labels')
                .data(data);
            leftLabels.enter().append('text');
            leftLabels.attr({
                    class: 'left_labels slope-label',
                    x: opts.margin.left + opts.labelLength,
                    y: function(d,i) { return opts.margin.top + scale(d[0]); },
                    dy: '.35em',
                    'text-anchor': 'end'})
                .text(function(d,i) { return dataset.label[0][i] });
            leftLabels.exit().remove();

            var rightLabels = chartSvg.selectAll('text.right_labels')
                .data(data);
            rightLabels.enter().append('text');
            rightLabels.attr({
                    class: 'right_labels slope-label',
                    x: opts.width - opts.margin.right - opts.labelLength,
                    y: function(d,i) { return opts.margin.top + scale(d[1]); },
                    dy: '0.35em'})
                .text(function(d,i) { return dataset.label[0][i] });
            rightLabels.exit().remove();
        });
    }

    exports.opts = opts;
    createAccessors(exports);

    return exports;
}


createAccessors = function(visExport) {
    for (var n in visExport.opts) {
        if (!visExport.opts.hasOwnProperty(n)) continue;
        visExport[n] = (function(n) {
            return function(v) {
                return arguments.length ? (visExport.opts[n] = v, this) : visExport.opts[n];
            }
        })(n);
    }
};
