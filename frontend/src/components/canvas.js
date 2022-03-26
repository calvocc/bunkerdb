import React, { useRef, useEffect } from "react";
import * as COLORES from '../constans/Colores';

const Canvas = ({seriesName, padding, gridScale, gridColor, data, colors, containerWidth, metrics}) => {
    const canvasRef = useRef(null);
    const legendRef = useRef(null);

    const drawLine = (ctx, startX, startY, endX, endY,color) => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        ctx.restore();
    }

    const drawBar = (canvas, ctx, upperLeftCornerX, upperLeftCornerY, width, height, color, name, value) => {
                
        ctx.save();
        ctx.fillStyle=color;
        ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);

        ctx.textAlign="left";
        ctx.fillStyle = COLORES.NEGRO;
        ctx.font = "12px Arial";
        ctx.textBaseline = "center";
        let text = ctx.measureText(name);
        ctx.fillText(name, (upperLeftCornerX + 8), (canvas.height - 45), text.width);
        
        ctx.restore();

        ctx.textAlign="left";
        ctx.fillStyle = COLORES.BORDE;
        ctx.font = "bold 20px Arial";
        ctx.textBaseline = "center";
        ctx.fillText(value, (upperLeftCornerX + 8), (canvas.height - 60));
        
        ctx.restore();
        
    }

    const filterValue = (element) => {
        const result = element.metrics.find(item => item.id === metrics);
        return result.value;
    }
    
    const draw = (canvas, ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) => {
        let maxValue = 0;
        data.forEach(element => {
            const val = filterValue(element);
            maxValue = Math.max(maxValue, val);
        });

        const canvasActualHeight = canvas.height - padding * 2;
        const canvasActualWidth = canvas.width - padding * 2;

        //dibujar las lieas
        let gridValue = 0;
        while (gridValue <= maxValue){
            const gridY = canvasActualHeight * (1 - gridValue/maxValue) + padding;
            drawLine(
                ctx,
                0,
                gridY,
                canvas.width,
                gridY,
                gridColor
            );

            //escribir marcadores de cuadrícula
            ctx.save();
            ctx.fillStyle = gridColor;
            ctx.textBaseline="bottom"; 
            ctx.font = "bold 10px Arial";
            ctx.fillText(gridValue, 10,gridY - 2);
            ctx.restore();
    
            gridValue+=gridScale;
        }

        //dibujar las barras
        let barIndex = 0;
        let numberOfBars = data.length;
        const barSize = (canvasActualWidth)/numberOfBars;

        data.forEach(element => {
            const val = filterValue(element);
            const barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                canvas,
                ctx,
                padding + barIndex * barSize,
                canvas.height - barHeight - padding,
                barSize,
                barHeight,
                colors[barIndex%colors.length],
                element.name,
                val
            );

            barIndex++;
        });

        // nombre de la serie
        ctx.save();
        ctx.textBaseline="bottom";
        ctx.textAlign="center";
        ctx.fillStyle = "#000000";
        ctx.font = "bold 14px Arial";
        ctx.fillText(`Filtering by ${metrics}`, canvas.width/2,canvas.height);
        ctx.restore();

    }

    useEffect(() => {
        if(data){
            const myCanvas = canvasRef.current
            myCanvas.width = containerWidth;
            myCanvas.height = 400;
            const context = myCanvas.getContext('2d')
            
            draw(myCanvas, context, 20, 250, 20, 50, '#000000')
        }
      }, [draw, data, metrics])

    return (
        <>
            <canvas ref={canvasRef} />
            <legend ref={legendRef} />
        </>
    )

}

export default Canvas